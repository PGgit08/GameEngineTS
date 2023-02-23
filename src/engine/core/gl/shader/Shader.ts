import Dictionary from "../../../extra/Dictionary";
import { GameObject } from "../../ecs/GameObject";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3 } from "gl-matrix";

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

    constructor(name: string) { super(name); ShaderManager.getInstance().addShader(this); }

    public use(): void {
        gl.useProgram(this._program);
    }

    public destroy(): void {
        gl.deleteProgram(this._program);
    }

    /**
     * Load all info about this Shader
     */
    public load(): void {
        const vShader: WebGLShader = this.loadShader(this.vSource, gl.VERTEX_SHADER);
        const fShader: WebGLShader = this.loadShader(this.fSource, gl.FRAGMENT_SHADER);

        this.createProgram(vShader, fShader);

        gl.linkProgram(this._program);

        this.detectAttributes();
        this.detectUniforms();
    }

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
    }

    public getAttributeLocation(attributeName: string): number {
        return this._attributes[attributeName];
    }

    public getUniformLocation(uniformName: string): WebGLUniformLocation {
        return this._uniforms[uniformName];
    }

    public applyStandardUniforms(model: mat3, projection: mat3): void {
        this.setUniformMatrix('model', model);
        this.setUniformMatrix('projection', projection);
    }

    private setUniformMatrix(uniformName: string, mat3: mat3): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniformMatrix3fv(
            location,
            false,
            mat3
        )
    }

    // TESTING ONLY
    private setUniformVector(uniformName: string, x: number, y: number): void {
        const location = this.getUniformLocation(uniformName);
        gl.uniform2fv(
            location,
            new Float32Array([x, y])
        )
    }
}
