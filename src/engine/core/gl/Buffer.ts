/**
 * A WebGL Buffer that uses Float data and ARRAY_BUFFER(s)
 */
export class Buffer {
    private _data: number[] = [];
    private _mode: number;
    private _buffer: WebGLBuffer;

    private get data(): number[] {
        return this._data;
    }

    constructor(mode: number = gl.TRIANGLES) {
        this._mode = mode;
        this._buffer = gl.createBuffer();
    }

    public bind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer); // sets the BUFFER global variable on WebGL
    }

    public unbind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined); // set the BUFFER global variable on WebGL
    }

    public destroy(): void {
        gl.deleteBuffer(this._buffer);
    }

    public upload(): void {
        this.bind();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._data), gl.STATIC_DRAW);
        this.unbind();
    }
}
