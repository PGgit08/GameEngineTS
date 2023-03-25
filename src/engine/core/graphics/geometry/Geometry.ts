import { Buffer } from "../../gl/Buffer";

export abstract class Geometry {
    protected _positionBuffer: Buffer;
    protected _textureBuffer: Buffer;

    constructor() {
        this._positionBuffer = new Buffer(this.positionData());
        this._textureBuffer = new Buffer(this.textureData(0, 0, 1, 1));
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
