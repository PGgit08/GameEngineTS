import { GameObject } from "../ecs/GameObject";
import { AttributeInfo } from "./AttributeInfo";

/**
 * A WebGL Buffer that uses Float data and ARRAY_BUFFER(s)
 */
export class Buffer extends GameObject {
    private _data: number[] = [];
    private _buffer: WebGLBuffer;

    private _mode: number = gl.TRIANGLES; // can be modified

    private _attributes: AttributeInfo[] = [];
    private _hasAttributes: boolean = false;

    private _elementSize: number = 0;

    public readonly TYPE_SIZE: number = 4; // FLOAT SIZE 

    public get data(): number[] {
        return this._data;
    }

    public set data(data: number[]) {
        this._data = data;
    }

    public get mode(): number {
        return this._mode;
    }

    public set mode(mode: number) {
        this._mode = mode;
    }

    constructor(name: string, data?: number[]) {
        super(name);

        if (data !== undefined) {
            this._data = data;
        }
        
        this._buffer = gl.createBuffer();
    }

    /**
     * Binds the Buffer to WebGL and enables all Attributes
     */
    public bind(): void {
        // How it works (probably):
        // sets global buffer variables to this buffer and links attributes to work with those buffers.
        // gl.drawArrays() will call the vertex shader N amount of times, in each iteration using enabled
        // attributes that are in the shader with their corresponding buffers 

        gl.bindBuffer(gl.ARRAY_BUFFER, this._buffer);

        // enable all attributes
        if (this._hasAttributes) {
            this._attributes.forEach((a) => {
                gl.enableVertexAttribArray(a.location);
                gl.vertexAttribPointer(a.location, a.size, gl.FLOAT, false, 0, 0); // stride is by default a.size * sizeof(gl.FLOAT)
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
     * Adds an Attribute to this Buffer
     * @param info The info of the Attribute
     */
    public addAttribute(info: AttributeInfo): void {
        this._attributes.push(info);
        this._elementSize += info.size;

        this._hasAttributes = true;
    }

    /**
     * Draws the Buffer
     */
    public draw(): void {        
        gl.drawArrays(
            this._mode,
            0,
            this._data.length / this._elementSize
        )
    }
}
