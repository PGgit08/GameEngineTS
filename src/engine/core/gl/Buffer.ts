/**
 * A WebGL Buffer that uses Float data and ARRAY_BUFFER(s)
 */
export class Buffer {
    private _data: number[] = [];
    private _mode: number;

    constructor(mode: number = gl.TRIANGLES) {
        this._mode = mode;
    }

    public bind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, new WebGLBuffer()); // sets the BUFFER global variable on WebGL
    }

    public unbind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined); // set the BUFFER global variable on WebGL
    }

    public upload(): void {
        this.bind();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._data), gl.STATIC_DRAW);
        this.unbind();
    }
}
