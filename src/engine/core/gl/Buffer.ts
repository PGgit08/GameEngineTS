import { AttributeInfo } from "./AttributeInfo";
import { Geometry } from "../graphics/geometry/Geometry";
import { NameRegistrar } from "../helpers/NameRegistrar";

/**
 * @classdesc
 * A NameRegistrar representing a WebGL buffer. This Buffer object holds data in the form of a number array that can be modified 
 * and uploaded and can be drawn using any WebGL drawing mode. It is meant to be used in the {@link Geometry} class.
 * 
 * @class Buffer
 * @extends NameRegistrar
 * 
 * @param {string} name - The name of this Buffer.
 * @param {number[]} [data] - The data of this Buffer (DEFAULT IS [(empty)], can be modified and reuploaded whenever).
 */
export class Buffer extends NameRegistrar {
    private _data: number[] = [];
    private _buffer: WebGLBuffer;

    private _mode: number = gl.TRIANGLES; // can be modified

    private _attributes: AttributeInfo[] = [];
    private _hasAttributes: boolean = false;

    private _elementSize: number = 0;

    /**
     * @returns {number[]} The data on this Buffer.
     */
    public get data(): number[] {
        return this._data;
    }

    public set data(data: number[]) {
        this._data = data;
    }

    /**
     * @returns {number} The drawing mode this Buffer is using.
     */
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
     * Binds this Buffer to WebGL and enables all its attributes.
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
     * Unbinds the Buffer from WebGL and disables all its attributes.
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

    /**
     * Deletes this Buffer from WebGL.
     */
    public destroy(): void {
        // TODO: Somehow incorporate this with a future GameObject.destroy?
        gl.deleteBuffer(this._buffer);
    }

    /**
     * Uploads this Buffer's data content to WebGL. Should be called whenever the data of this Buffer changes.
     */
    public upload(): void {
        this.bind(); // binds this buffer to webgl
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(this._data), gl.STATIC_DRAW); // uploads data to the binding webgl buffer (this)
        this.unbind(); // unbinds this buffer from webgl
    }

    /**
     * Adds an attribute to this Buffer.
     * 
     * @param {AttributeInfo} info - The info of the attribute.
     */
    public addAttribute(info: AttributeInfo): void {
        this.registerName(info.name);

        this._attributes.push(info);
        this._elementSize += info.size;

        this._hasAttributes = true;
    }

    // TODO: Add attribute removal here later

    
    /**
     * Draws this Buffer.
     */
    public draw(): void {        
        gl.drawArrays(
            this._mode,
            0,
            this._data.length / this._elementSize
        )
    }
}
