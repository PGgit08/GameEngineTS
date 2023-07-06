import { vec2 } from "gl-matrix";
import { Buffer } from "../../gl/Buffer";
import { Shader } from "../../gl/shader/Shader";
import Dictionary from "../../../types/Dictionary";
import { AttributeInfo } from "../../gl/AttributeInfo";
import { ShaderConfig } from "../../gl/shader/ShaderConfig";
import { BufferConfig } from "../../gl/BufferConfig";
import { GameObject } from "../../ecs/GameObject";

export abstract class Geometry extends GameObject {
    private _buffers: Dictionary<string, Buffer> = {};
    private _attributes: AttributeInfo[] = [];

    public origin: vec2 = vec2.fromValues(0.5, 0.5);
    protected _width: number;
    protected _height: number;

    protected _minX: number;
    protected _minY: number;
    protected _maxX: number;
    protected _maxY: number;

    public get width(): number {
        return this._width;
    }

    public get height(): number {
        return this._height
    }

    constructor(name: string, width: number, height: number) {
        super(name);

        this._width = width;
        this._height = height;

        this.calcPosXY();

        this.addDefaultBuffers(); // adds default buffers for position, texture, etc.
        this.addDefaultAttributes(); // adds attributes for defaults like position, texture, etc.
    }

    /**
     * Calculates the MIN/MAX X/Y values for this Geometry's position.
     */
    public calcPosXY(): void {
        this._minX = -(this.origin[0] * this._width);
        this._minY = -(this.origin[1] * this._height);
        this._maxX = (1 - this.origin[0]) * this._width;
        this._maxY = (1 - this.origin[1]) * this._height;
    }


    private addDefaultAttributes(): void {
        // add all required attributes
        Object.values(BufferConfig.NAMES).forEach((buffer, index) => {
            this.addAttribute({
                name: Object.values(ShaderConfig.ATTRIB_NAMES)[index],
                size: Object.values(ShaderConfig.ATTRIB_SIZES)[index],
                buffer: buffer
            })
        });
    }

    private loadAttributes(shader: Shader): void {
        this._attributes.forEach((attrib: AttributeInfo) => {
            attrib.location = shader.getAttributeLocation(attrib.name);
            this.getBuffer(attrib.buffer).addAttribute(attrib);
        });
    }

    /**
     * Add an Attribute to this Geometry.
     * @param attribute The info of the Attribute that's being added.
     */
    public addAttribute(attribute: AttributeInfo): void {
        this._attributes.push(attribute);
    }


    private getBuffer(name: string): Buffer {
        if (this._buffers[name] === undefined) {
            throw new Error(`Cannot find Buffer in this Geometry called '${name}'`);
        }

        return this._buffers[name];
    }

    private addDefaultBuffers(): void {
        this.addBuffer(new Buffer(BufferConfig.NAMES.POSITION_BUFFER_NAME, this.positionData()));
        this.addBuffer(new Buffer(BufferConfig.NAMES.TEXTURE_BUFFER_NAME, this.textureData(0, 0, 1, 1)));
    }

    /**
     * Add a Buffer to this Geometry.
     * @param buffer The Buffer to add to this Geometry.
     */
    public addBuffer(buffer: Buffer): void {
        this._buffers[buffer.name] = buffer;
    }

    /**
     * Upload a Buffer of this Geometry to the GPU.
     * @param name 
     */
    public uploadBuffer(name: string): void {
        this.getBuffer(name).upload();
    }


    /**
     * Set the inner data of a Buffer in this Geometry.
     * @param name The name of the Buffer.
     * @param data The data to set the Buffer to.
     */
    public setBuffer(name: string, data: number[]): void {
        this.getBuffer(name).data = data;
    }

    /**
     * Sets the Buffer's drawing mode to LINE_STRIP
     */
    public enableWireframe(): void {
        this.getBuffer(BufferConfig.NAMES.POSITION_BUFFER_NAME).mode = gl.LINE_STRIP;
    }

    /**
     * Sets the Buffer's drawing mode to default (TRIANGLES)
     */
    public disableWireframe(): void {
        this.getBuffer(BufferConfig.NAMES.POSITION_BUFFER_NAME).mode = gl.TRIANGLES;
    }


    /**
     * Returns the positions of the verticies for this Geometry's position Buffer.
     */
    public abstract positionData(): number[];

    /**
     * Returns texture positions buffer data for this Geometry's texture Buffer.
     * @param minTexX The top left corner X coord of this Frame in its Texture (in WebGL coordinates).
     * @param minTexY The top left corner Y coord of this Frame in its Texture (in WebGL coordinates).
     * @param maxTexX The bottom right corner X coord of this Frame in its Texture (in WebGL coordinates).
     * @param maxTexY The bottom right corner Y coord of this Frame in its Texture (in WebGL coordinates).
     */
    public abstract textureData(
        minTexX: number,
        minTexY: number,
        maxTexX: number,
        maxTexY: number
    ): number[]; // (WebGL texture origin is at top-left corner, down +Y, right +X)

    /**
     * Load this Geometry and upload its Buffer
     */
    public load(shader: Shader): void {
        this.loadAttributes(shader);
        Object.values(this._buffers).forEach((buffer) => buffer.upload());
    }

    /**
     * Draw the Geometry
     */
    public draw(): void {
        Object.values(this._buffers).forEach((buffer) => buffer.bind());

        this.getBuffer(BufferConfig.NAMES.POSITION_BUFFER_NAME).draw()
        
        Object.values(this._buffers).forEach((buffer) => buffer.unbind());
    }
}
