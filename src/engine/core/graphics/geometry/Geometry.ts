import { Buffer } from "../../gl/Buffer";

export abstract class Geometry {
    protected _buffer: Buffer;

    constructor(mode: number) {
        this._buffer = new Buffer(mode, this.data());
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
