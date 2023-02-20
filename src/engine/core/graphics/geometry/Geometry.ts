import { Buffer } from "../../gl/Buffer";

export abstract class Geometry {
    protected _buffer: Buffer;

    constructor(mode: number = gl.TRIANGLES) {
        this._buffer = new Buffer(mode, this.data());
        this.setAttributes();
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
     * Draw the Geometry
     */
    public draw(): void {
        this._buffer.draw();
    }
}
