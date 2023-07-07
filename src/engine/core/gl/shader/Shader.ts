import Dictionary from "../../../types/Dictionary";
import { GameObject } from "../../ecs/GameObject";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3, vec2, vec4 } from "gl-matrix";
import { ShaderConfig } from "../../config/ShaderConfig";
import { Texture } from "../../graphics/Texture";
import { Color } from "../../graphics/Color";

/**
 * @classdesc
 * A GameObject representing a WebGL shader. It is meant to be overriden by any custom shaders. When loaded (which is called during the 
 * {@link Lifecycle} load period or when this Shader is added into the hierarchy), this Shader gets uploaded and it is also checked for
 * all mandatory variables that exist in the {@link ShaderConfig} config class.
 * 
 * @class Shader
 * @extends GameObject
 * @abstract
 * 
 * @param {string} name - The name of this Shader. It is name checked and it enforces that its name and class name match.
 */
export abstract class Shader extends GameObject {
    private _attributes: Dictionary<string, number> = {};
    private _uniforms: Dictionary<string, WebGLUniformLocation> = {};

    private _program: WebGLProgram;

    private _loaded: boolean = false;

    /**
     * @abstract
     * @returns {string} Returns the Vertex Shader source code in GLSL.
     */
    public abstract get vSource(): string;

    /**
     * @abstract
     * @returns {string} Returns the Fragment Shader source code in GLSL.
     */
    public abstract get fSource(): string;


    constructor(name: string) { super(name, true); ShaderManager.getInstance().addShader(this); }

    /**
     * Tells WebGL to use this Shader.
     */
    public use(): void {
        gl.useProgram(this._program);
    }

    /**
     * Deletes this Shader from WebGL. 
     */
    public destroy(): void {
        // TODO: Somehow incorporate this with a future GameObject.destroy?
        gl.deleteProgram(this._program);
    }

    /**
     * Loads this Shader (Creates shader program and checks for mandatory variables).
     */
    public load(): void {
        if (this._loaded) return;

        const vShader: WebGLShader = this.loadShader(this.vSource, gl.VERTEX_SHADER);
        const fShader: WebGLShader = this.loadShader(this.fSource, gl.FRAGMENT_SHADER);

        this.createProgram(vShader, fShader);

        gl.linkProgram(this._program);

        this.detectAttributes();
        this.detectUniforms();

        this._loaded = true;
    }

    /**
     * Compile a shader program given source code.
     * @param {string} source - Shader source code string.
     * @param {string} type - The Shader type (vertex/fragment).
     * @returns {WebGLShader} The compiled WebGL shader.
     */
    public loadShader(source: string, type: number): WebGLShader {
        const shader: WebGLShader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (gl.getShaderInfoLog(shader) !== "") {
            console.log(gl.getShaderInfoLog(shader));
            throw new Error("Problem compiling shader.");
        }

        return shader;
    }

    // create the whole webgl shader program
    private createProgram(vShader: WebGLShader, fShader: WebGLShader): void {
        const program = gl.createProgram();

        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);

        if (gl.getProgramInfoLog(program) !== "") {
            throw new Error("Problem creating shader program.");
        }

        this._program = program;
    }

    // detect and look for mandatory attributes
    private detectAttributes(): void {
        let attributeCount = gl.getProgramParameter(this._program, gl.ACTIVE_ATTRIBUTES);
        for (let i = 0; i < attributeCount; i++) {
            let info: WebGLActiveInfo = gl.getActiveAttrib(this._program, i);

            if (!info){
                break;
            };

            this._attributes[info.name] = gl.getAttribLocation(this._program, info.name);
        };

        Object.values(ShaderConfig.ATTRIB_NAMES).forEach((name) => {
            if (!Object.keys(this._attributes).includes(name)) { throw new Error(`Shader missing required attribute '${name}'`); }
        });
    }

    // detect and look for mandatory uniforms
    private detectUniforms(): void {
        let uniformCount = gl.getProgramParameter(this._program, gl.ACTIVE_UNIFORMS);
        for (let i = 0; i < uniformCount; i++){
            let info: WebGLActiveInfo = gl.getActiveUniform(this._program, i);
            if (!info){
                break;
            };

            this._uniforms[info.name] = gl.getUniformLocation(this._program, info.name);
        };

        Object.values(ShaderConfig.UNIFORM_NAMES).forEach((name) => {
            if (!Object.keys(this._uniforms).includes(name)) { throw new Error(`Shader missing required uniform '${name}'`); }
        });
    }

    /**
     * Gets the location of an attribute in this Shader.
     * @param {string} attributeName - The name of the attribute to find.
     * @returns {number} The location of the attribute.
     */
    public getAttributeLocation(attributeName: string): number {
        if (this._attributes[attributeName] === undefined) throw new Error(`Attribute ${attributeName} does not exist in this program.`);

        return this._attributes[attributeName];
    }

    /**
     * Gets the location of a uniform in this Shader.
     * @param {string} uniformName - The name of the uniform to find.
     * @returns {WebGLUniformLocation} The location of the uniform.
     */
    public getUniformLocation(uniformName: string): WebGLUniformLocation {
        if (this._uniforms[uniformName] === undefined) throw new Error(`Uniform ${uniformName} does not exist in this program.`);

        return this._uniforms[uniformName];
    }

    /**
     * Apply standard required uniforms to this Shader.
     * @param {mat3} model - The Model Matrix (3x3).
     * @param {mat3} projection - The Projection Matrix (3x3).
     * @param {mat3} view - The View Matrix (3x3).
     * @param {Texture} texture - The Texture.
     * @param {Color} color - The Color.
     */
    public applyStandardUniforms(model: mat3, projection: mat3, view: mat3, texture: Texture, color: Color): void {
        this.setUniformMatrix(ShaderConfig.UNIFORM_NAMES.MODEL_MAT, model);
        this.setUniformMatrix(ShaderConfig.UNIFORM_NAMES.PROJ_MAT, projection);
        this.setUniformMatrix(ShaderConfig.UNIFORM_NAMES.VIEW_MAT, view);
        
        texture.activateAndBind();
        this.setUniformVec4(ShaderConfig.UNIFORM_NAMES.COLOR, color.toVec4());
    }

    /**
     * Set a matrix uniform for this Shader.
     * @param {string} uniformName - The uniform name.
     * @param {mat3} mat3 - The matrix.
     */
    public setUniformMatrix(uniformName: string, mat3: mat3): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniformMatrix3fv(
            location,
            false,
            mat3
        )
    }

    /**
     * Set a 2D vector uniform for this Shader.
     * @param {string} uniformName - The uniform name.
     * @param {vec2} vec - The vector.
     */
    public setUniformVec2(uniformName: string, vec: vec2): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform2fv(
            location,
            new Float32Array(vec)
        )
    }

    /**
     * Set a 4D vector uniform for this Shader.
     * @param {string} uniformName - The uniform name.
     * @param {vec2} vec - The vector.
     */
    public setUniformVec4(uniformName: string, vec: vec4): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform4fv(
            location,
            new Float32Array(vec)
        )
    }

    /**
     * Sets a integer uniform for this Shader.
     * @param {string} uniformName - The uniform name.
     * @param {number} int - The integer.
     */
    public setUniformInt(uniformName: string, int: number): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform1i(
            location,
            int
        );
    }
}
