import { AttributeInfo } from "./AttributeInfo";

/**
 * A WebGL Buffer that uses Float data and ARRAY_BUFFER(s)
 */
export class Buffer {
    private _data: number[] = [];
    private _buffer: WebGLBuffer;

    private _mode: number;

    private _attributes: AttributeInfo[] = [];
    private _hasAttributes: boolean = false;

    private _elementSize: number = 0;
    private _stride: number = 0;

    public readonly TYPE_SIZE: number = 4; // FLOAT SIZE 

    public get data(): number[] {
        return this._data;
    }

    constructor(mode: number, data: number[]) {
        this._mode = mode;
        this._data = data;
        this._buffer = gl.createBuffer();
    }

    /**
     * Binds the Buffer to WebGL and enables all Attributes
     */
    public bind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer); // sets the BUFFER global variable on WebGL

        // enable all attributes
        if (this._hasAttributes) {
            this._attributes.forEach((a) => {
                gl.enableVertexAttribArray(a.location);
                gl.vertexAttribPointer(a.location, a.size, gl.FLOAT, false, this._stride, a.offset);
            });
        }
    }

    /**
     * Unbinds the Buffer from WebGL and disables all Attributes
     */
    public unbind(): void {
        gl.bindBuffer(gl.ARRAY_BUFFER, undefined); // set the BUFFER global variable on WebGL

        // disable all attributes
        if (this._hasAttributes) {
            this._attributes.forEach((a) => {
                gl.disableVertexAttribArray(a.location);
            });
        }
    }

    public destroy(): void {
        gl.deleteBuffer(this._buffer);
    }

    /**
     * Uploads data content to the Buffer
     */
    public upload(): void {
        this.bind();
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._data), gl.STATIC_DRAW);
        this.unbind();
    }

    /**
     * Adds an Attribute to this buffer
     * @param info The info of the Attribute
     */
    public addAttribute(info: AttributeInfo): void {
        info.offset += this._elementSize * this.TYPE_SIZE; // increase attrib offset by the prev element size
        this._attributes.push(info);
        this._elementSize += info.size;
        this._stride += this._elementSize * this.TYPE_SIZE; // help WebGL with a stride value

        this._hasAttributes = true;
    }

    /**
     * Draws the Buffer
     */
    public draw(): void {
        this.bind();
        
        gl.drawArrays(
            this._mode,
            0,
            this._data.length / this._elementSize
        )

        this.unbind();
    }
}
