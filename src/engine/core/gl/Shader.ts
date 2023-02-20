export abstract class Shader {
    private _program: WebGLProgram;

    /**
     * Returns the Vertex Shader source code in GLSL
     */
    public abstract get vSource(): string;

    /**
     * Returns the Fragment Shader source code in GLSL
     */
    public abstract get fSource(): string;

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
    }

    public loadShader(source: string, type: number): WebGLShader {
        const shader: WebGLShader = gl.createShader(type);

        gl.shaderSource(shader, source);
        gl.compileShader(shader);

        if (gl.getShaderInfoLog(shader) !== "") {
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
}