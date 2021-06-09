import { GLMatrix4 } from "@gl/GLMatrix4";

/**
 * A WebGL Shader
 */
export abstract class GLShader{
    private _name: string;
    private _program: WebGLProgram;

    private _attributes: {[name: string]: number} = {};
    private _uniforms: {[name: string]: WebGLUniformLocation} = {};

    public constructor(name: string){
        this._name = name;
    };

    public get name(): string{
        return this._name;
    };

    /**
     * Make use of this shader.
     */
    public use(): void{
        GL.useProgram(this._program);
    };

    /**
     * Sets a 4x4 matrix uniform.
     * @param uniformName The name of the matrix uniform.
     * @param mat4 The matrix to the unifrom to.
     */
    public setUniformMatrix(uniformName: string, mat4: GLMatrix4): void{
        let location = this.getAttributeLocation(uniformName);
        GL.uniformMatrix4fv(
            location,
            false,
            mat4.glMatrix
        );
    };

    /**
     * Get the location of an attribute.
     * @param name The name of the attribute(string).
     */
    public getAttributeLocation(name: string): number{
        if(this._attributes[name] === undefined){
            throw new Error(`Unable to find attribute named '${name}' in shader named '${this._name}'`);
        };

        return this._attributes[name];
    };

    /**
     * Get the location of a uniform.
     * @param name The name of this uniform(string).
     */
    public getUniformLocation(name: string): WebGLUniformLocation{
        if(this._uniforms[name] === undefined){
            throw new Error(`Unable to find uniform named '${name}' in shader named '${this._name}'`);
        };

        return this._uniforms[name];
    };

    /**
     * Apply standard uniforms to this shader.
     * @param model The model matrix.
     * @param projection The projection matrix.
     * @param view The view matrix.
     */
    public abstract ApplyStandardUniforms(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void;


    /**
     * Get the vertex shader source.
     * @returns String.
     */
    protected abstract get vSource(): string;
    
    /**
     * Get the fragment shader source.
     * @returns String.
     */
    protected abstract get fSource(): string;

    /**
     * Loads the shaders and makes shader programs
     * @param vSource Vertex shader source(string).
     * @param fSource Fragment shader source(string).
     */
    public load(){
        let vertexShader = this.loadShader(this.vSource, GL.VERTEX_SHADER);
        let fragmentShader = this.loadShader(this.fSource, GL.FRAGMENT_SHADER);

        this.createProgram(vertexShader, fragmentShader);

        // find attributes and uniforms in this shader program
        this.detectAttributes();
        this.detectUniforms(); 
    };

    private loadShader(source: string, type: number): WebGLShader{
        // create new shader program with type
        let shader: WebGLShader = GL.createShader(type);

        // set the source and compile shader
        GL.shaderSource(shader, source);
        GL.compileShader(shader);

        // check for errors in compilation
        let error = GL.getShaderInfoLog(shader).trim();
        if ( error !== "" ) {
            throw new Error( "Error compiling shader '" + this._name + "': " + error );
        }

        return shader;
    };

    private createProgram(vShader: WebGLShader, fShader: WebGLShader): void{
        // create a new webgl program
        this._program = GL.createProgram();

        // attach shader programs to webgl program
        GL.attachShader(this._program, vShader);
        GL.attachShader(this._program, fShader);

        // linking program to GPU?
        GL.linkProgram(this._program);

        // check for errors in linking shaders
        let error = GL.getProgramInfoLog(this._program).trim();
        if (error !== "") {
            throw new Error( "Error linking shader '" + this._name + "': " + error );
        }
    };

    private detectAttributes(): void{
        // finds attributes in shaders
        let attributeCount = GL.getProgramParameter( this._program, GL.ACTIVE_ATTRIBUTES );
        for (let i = 0; i < attributeCount; i++){
            let info: WebGLActiveInfo = GL.getActiveAttrib(this._program, i);
            if (!info){
                break;
            };

            this._attributes[info.name] = GL.getAttribLocation(this._program, info.name);
        };
    };

    private detectUniforms(): void{
        // finds uniforms in shaders
        let uniformCount = GL.getProgramParameter(this._program, GL.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++){
            let info: WebGLActiveInfo = GL.getActiveUniform(this._program, i);
            if (!info){
                break;
            };

            this._uniforms[info.name] = GL.getUniformLocation(this._program, info.name);
        };
    };
};