import Dictionary from "../../../extra/Dictionary";
import { GameObject } from "../../ecs/GameObject";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3, vec2, vec4 } from "gl-matrix";
import { ShaderConfig } from "./ShaderConfig";

export abstract class Shader extends GameObject {
    private _attributes: Dictionary<string, number> = {};
    private _uniforms: Dictionary<string, WebGLUniformLocation> = {};

    private _program: WebGLProgram;

    /**
     * Returns the Vertex Shader source code in GLSL
     */
    public abstract get vSource(): string;

    /**
     * Returns the Fragment Shader source code in GLSL
     */
    public abstract get fSource(): string;

    constructor(name: string) { super(name, true); ShaderManager.getInstance().addShader(this); }

    public use(): void {
        gl.useProgram(this._program);
    }

    public destroy(): void {
        gl.deleteProgram(this._program);
    }

    /**
     * Load this Shader
     */
    public load(): void {
        const vShader: WebGLShader = this.loadShader(this.vSource, gl.VERTEX_SHADER);
        const fShader: WebGLShader = this.loadShader(this.fSource, gl.FRAGMENT_SHADER);

        this.createProgram(vShader, fShader);

        gl.linkProgram(this._program);

        this.detectAttributes();
        this.detectUniforms();
    }

    /**
     * Compile Shader given source code.
     * @param source Shader source code string.
     * @param type The Shader type (vertex/fragment).
     * @returns The compiled WebGLShader.
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

    private createProgram(vShader: WebGLShader, fShader: WebGLShader): void {
        const program = gl.createProgram();

        gl.attachShader(program, vShader);
        gl.attachShader(program, fShader);

        if (gl.getProgramInfoLog(program) !== "") {
            throw new Error("Problem creating shader program.");
        }

        this._program = program;
    }

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
            if (!Object.keys(this._attributes).includes(name)) { throw new Error("All required Shader attributes not supplied."); }
        })
    }

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
            if (!Object.keys(this._uniforms).includes(name)) { throw new Error("All required Shader uniforms not supplied."); }
        })
    }

    public getAttributeLocation(attributeName: string): number {
        return this._attributes[attributeName];
    }

    public getUniformLocation(uniformName: string): WebGLUniformLocation {
        return this._uniforms[uniformName];
    }

    /**
     * Apply standard matrix uniforms.
     * @param model The Model Matrix (3x3).
     * @param projection The Projection Matrix (3x3).
     */
    public applyStandardUniforms(model: mat3, projection: mat3, view: mat3): void {
        this.setUniformMatrix('u_model', model);
        this.setUniformMatrix('u_projection', projection);
        this.setUniformMatrix('u_view', view);
    }

    /**
     * Set a matrix uniform.
     * @param uniformName The uniform name.
     * @param mat3 The matrix.
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
     * Set a uniform 2D vector.
     * @param uniformName The uniform name.
     * @param vec The vector.
     */
    public setUniformVec2(uniformName: string, vec: vec2): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform2fv(
            location,
            new Float32Array(vec)
        )
    }

    /**
     * Set a uniform 4D vector.
     * @param uniformName The uniform name.
     * @param vec The vector.
     */
    public setUniformVec4(uniformName: string, vec: vec4): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform4fv(
            location,
            new Float32Array(vec)
        )
    }

    /**
     * Sets a uniform integer.
     * @param uniformName The uniform name.
     * @param int The integer.
     */
    public setUniformInt(uniformName: string, int: number): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform1i(
            location,
            int
        );
    }
}
