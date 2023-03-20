import { Buffer } from "../../gl/Buffer";

export abstract class Geometry {
    protected _positionBuffer: Buffer;
    protected _textureBuffer: Buffer;

    constructor() {
        this._positionBuffer = new Buffer(this.positionData());
        this._textureBuffer = new Buffer(this.textureData());
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
     * The positions of the verticies for this Geometry's position Buffer
     */
    public abstract positionData(): number[];

    /**
     * The texture positions buffer data for this Geometry's texture Buffer
     */
    public abstract textureData(): number[]; // (WebGL texture origin is at top-left corner, down +Y, right +X)

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
        // this._textureBuffer.draw();
        this._textureBuffer.bind();
        this._positionBuffer.draw();
    }
}
