import { vec2 } from "gl-matrix";
import { Buffer } from "../../gl/Buffer";

export abstract class Geometry {
    protected _positionBuffer: Buffer;
    protected _textureBuffer: Buffer;

    protected _width: number;
    protected _height: number;
    public origin: vec2 = vec2.fromValues(0.5, 0.5);

    protected _minX: number;
    protected _minY: number;
    protected _maxX: number;
    protected _maxY: number;

    constructor(width: number, height: number) {
        this._width = width;
        this._height = height;

        this.calcPosXY();

        this._positionBuffer = new Buffer(this.positionData());
        this._textureBuffer = new Buffer(this.textureData(0, 0, 1, 1));
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

    /**
     * Sets the data of this Geometry's position Buffer.
     * @param data The data to set to.
     */
    public setPositionBuffer(data: number[]): void {
        this._positionBuffer.data = data;
    }

    /**
     * Sets the data of this Geometry's texture Buffer.
     * @param data The data to set to.
     */
    public setTexBuffer(data: number[]): void {
        this._textureBuffer.data = data;
    }

    /**
     * Sets the Buffer's drawing mode to LINE_STRIP
     */
    public enableWireframe(): void {
        this._positionBuffer.mode = gl.LINE_STRIP;
    }

    /**
     * Sets the Buffer's drawing mode to default (TRIANGLES)
     */
    public disableWireframe(): void {
        this._positionBuffer.mode = gl.TRIANGLES;
    }

    /**
     * Set the attributes for this Geometry's Buffer
     */
    protected abstract setAttributes(): void;

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
    public load(): void {
        this.setAttributes();
        
        this._positionBuffer.upload();
        this._textureBuffer.upload();
    }

    /**
     * Draw the Geometry
     */
    public draw(): void {
        this._textureBuffer.bind();
        this._positionBuffer.draw();

        this._textureBuffer.unbind();
    }
}
