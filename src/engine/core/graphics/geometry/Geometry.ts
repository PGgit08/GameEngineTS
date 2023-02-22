import { Buffer } from "../../gl/Buffer";

export abstract class Geometry {
    protected _buffer: Buffer;

    constructor() {
        this._buffer = new Buffer(this.data());
    }

    /**
     * Sets the Buffer's drawing mode to LINE_STRIP
     */
    public enableWireframe(): void {
        this._buffer.mode = gl.LINE_STRIP;
    }

    /**
     * Sets the Buffer's drawing mode to default (TRIANGLES)
     */
    public disableWireframe(): void {
        this._buffer.mode = gl.TRIANGLES;
    }

    /**
     * Set the attributes for this Geometry's Buffer
     */
    protected abstract setAttributes(): void;

    /**
     * The verticies for this Geometry's Buffer
     */
    public abstract data(): number[];

    /**
     * Load this Geometry and upload its Buffer
     */
    public load(): void {
        this.setAttributes();
        this._buffer.upload();
    }

    /**
     * Draw the Geometry
     */
    public draw(): void {
        this._buffer.draw();
    }
}
