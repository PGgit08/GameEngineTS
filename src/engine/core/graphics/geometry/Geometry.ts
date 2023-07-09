import { vec2 } from "gl-matrix";
import { Buffer } from "../../gl/Buffer";
import { Shader } from "../../gl/shader/Shader";
import Dictionary from "../../../types/Dictionary";
import { AttributeInfo } from "../../gl/AttributeInfo";
import { ShaderConfig } from "../../config/ShaderConfig";
import { BufferConfig } from "../../config/BufferConfig";
import { NameRegistrar } from "../../helpers/NameRegistrar";

import { Frame } from "../Frame";
import { Texture } from "../Texture";
import { Mesh } from "../Mesh";
import { Material } from "../material/Material";

/**
 * @classdesc
 * A NameRegistrar that is responsible for storing, modifying, and drawing {@link Buffer} objects. This class is meant to be 
 * overriden by custom Geometries and shapes who have their own position data and texture data. This Geometry is rendered first by the
 * {@link Mesh} class before it is "painted" by a {@link Material} class.
 * 
 * @class Geometry
 * @extends NameRegistrar
 * @abstract
 * 
 * @param {string} name - The name of this Geometry.
 * @param {number} width - The width of this Geometry.
 * @param {number} height - The height of this Geometry.
 */
export abstract class Geometry extends NameRegistrar {
    private _buffers: Dictionary<string, Buffer> = {};
    private _attributes: AttributeInfo[] = [];

    /** The "rotation" origin for this Geometry (DEFAULT IS CENTER -> (0.5, 0.5)) @type {vec2} */
    public origin: vec2 = vec2.fromValues(0.5, 0.5);

    private _loaded: boolean = false;

    protected _width: number;
    protected _height: number;

    protected _minX: number;
    protected _minY: number;
    protected _maxX: number;
    protected _maxY: number;

    /** @returns {number} The width of this Geometry. */
    public get width(): number {
        return this._width;
    }

    /** @returns {number} The height of this Geometry. */
    public get height(): number {
        return this._height
    }

    constructor(name: string, width: number, height: number) {
        super(name);

        this._width = width;
        this._height = height;

        this.createRegister(); // create an additional name register at index 1 for buffers

        this.calcPosXY();

        this.addDefaultBuffers(); // adds default buffers for position, texture, etc.
        this.addDefaultAttributes(); // adds attributes for defaults like position, texture, etc.
    }

    // load the attributes of this geometry ONCE
    private loadAttributes(shader: Shader): void {
        this._attributes.forEach((attrib: AttributeInfo) => {
            attrib.location = shader.getAttributeLocation(attrib.name);
            this.getBuffer(attrib.buffer).addAttribute(attrib);
        });
    }

    // add the default buffers ONCE
    private addDefaultBuffers(): void {
        this.addBuffer(new Buffer(BufferConfig.BUFFER_NAMES.POSITION_BUFFER_NAME, this.positionData()));
        this.addBuffer(new Buffer(BufferConfig.BUFFER_NAMES.TEXTURE_BUFFER_NAME, this.textureData(0, 0, 1, 1)));
    }

    // add the default attributes ONCE
    private addDefaultAttributes(): void {
        // add all required attributes
        Object.values(BufferConfig.BUFFER_NAMES).forEach((buffer, index) => {
            this.addAttribute({
                name: Object.values(ShaderConfig.ATTRIB_NAMES)[index],
                size: Object.values(ShaderConfig.ATTRIB_SIZES)[index],
                buffer: buffer
            })
        });
    }

    private getBuffer(name: string): Buffer {
        if (this._buffers[name] === undefined) {
            throw new Error(`Cannot find Buffer in this Geometry called '${name}'`);
        }

        return this._buffers[name];
    }


    /**
     * Add a Buffer to this Geometry. Can only be done before loading.
     * 
     * @param {Buffer} buffer - The Buffer to add to this Geometry.
     */
    public addBuffer(buffer: Buffer): void {
        if (this._loaded) return;

        this.registerName(buffer.name, 1); // register at the buffer name register
        this._buffers[buffer.name] = buffer;
    }

    /**
     * Add an attribute to this Geometry. Can only be done before loading.
     * 
     * @param {AttributeInfo} attribute - The info of the attribute that's being added.
     */
    public addAttribute(attribute: AttributeInfo): void {
        if (this._loaded) return;

        this.registerName(attribute.name);
        this._attributes.push(attribute);
    }

    /**
     * Calculates the MIN/MAX X/Y values for this Geometry's position.
     * Should be called any time the origin of this Geometry changes.
     */
    public calcPosXY(): void {
        this._minX = -(this.origin[0] * this._width);
        this._minY = -(this.origin[1] * this._height);
        this._maxX = (1 - this.origin[0]) * this._width;
        this._maxY = (1 - this.origin[1]) * this._height;
    }

    /**
     * Upload a Buffer of this Geometry to the WebGL. Should be done any time the Buffer's data is changed.
     * 
     * @param {string} name - The name of the Buffer.
     */
    public uploadBuffer(name: string): void {
        this.getBuffer(name).upload();
    }

    /**
     * Set the inner data of a Buffer of this Geometry.
     * 
     * @param {string} name - The name of the Buffer.
     * @param {number[]} data - The data to set the Buffer to.
     */
    public setBuffer(name: string, data: number[]): void {
        this.getBuffer(name).data = data;
    }

    /**
     * Enables wireframe on this Geometry by setting its position Buffer's drawing mode to {@link gl.LINE_STRIP}.
     */
    public enableWireframe(): void {
        this.getBuffer(BufferConfig.BUFFER_NAMES.POSITION_BUFFER_NAME).mode = gl.LINE_STRIP;
    }

    /**
     * Disables wireframe on this Geometry by setting its position Buffer's drawing mode to {@link gl.TRIANGLES}.
     */
    public disableWireframe(): void {
        this.getBuffer(BufferConfig.BUFFER_NAMES.POSITION_BUFFER_NAME).mode = gl.TRIANGLES;
    }

    /**
     * Returns the positions of the verticies for this Geometry's position Buffer. Should be overriden by any custom Geometry.
     * 
     * @abstract
     * 
     * @returns {number[]} The verticies of this Geometry's position Buffer.
     */
    public abstract positionData(): number[];

    /**
     * Returns texture positions of this Geometry's texture Buffer. Should be overriden by any custom Geometry.
     * 
     * @abstract
     * 
     * @param minTexX The top left corner X coord of the {@link Frame} in its {@link Texture} (in WebGL coordinates).
     * @param minTexY The top left corner Y coord of this {@link Frame} in its {@link Texture} (in WebGL coordinates).
     * @param maxTexX The bottom right corner X coord of this {@link Frame} in its {@link Texture} (in WebGL coordinates).
     * @param maxTexY The bottom right corner Y coord of this {@link Frame} in its {@link Texture} (in WebGL coordinates).
     * 
     * @returns {number[]} The texture positions of this Geometry's texture Buffer.
     */
    public abstract textureData(
        minTexX: number,
        minTexY: number,
        maxTexX: number,
        maxTexY: number
    ): number[]; // (WebGL texture origin is at top-left corner, down +Y, right +X)


    /**
     * Loads this Geometry by loading its attributes and uploading its Buffers (CALLED ONCE).
     */
    public load(shader: Shader): void {
        if (this._loaded) return;

        this.loadAttributes(shader);
        Object.values(this._buffers).forEach((buffer) => buffer.upload());

        this._loaded = true;
    }

    /**
     * Draws the Geometry.
     */
    public draw(): void {
        Object.values(this._buffers).forEach((buffer) => buffer.bind());

        this.getBuffer(BufferConfig.BUFFER_NAMES.POSITION_BUFFER_NAME).draw()
        
        Object.values(this._buffers).forEach((buffer) => buffer.unbind());
    }
}
