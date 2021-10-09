import { GLBuffer } from '@gl/GLBuffer';
import { Vector2 } from '@physics/Vector';


export abstract class Geometry {
    // the anchor point for a drawable, used for rotation and tranformations(defaults to half)
    private _anchor: Vector2;

    // the anchor point on graph
    private _anchorPoint: Vector2 = Vector2.origin;

    // the width and height of this Drawable
    protected _width: number;
    protected _height: number;

    // the min/max X calculated with origin and width(can be useful for AABB)
    protected _minX: number;
    protected _maxX: number;
    
    // the min/max Y calculated with origin and height(can be useful for AABB)
    protected _minY: number;
    protected _maxY: number;

    // The WebGL buffer that associates to this Geometry
    protected _buffer: GLBuffer = new GLBuffer();

    /**
     * Create a new Geometry. Contains buffers and attributes.
     * @param width The width of this Geometry ( default: 100 ) .
     * @param height The height of this Geometry ( default: 100 ) .
     * @param anchor The anchor point ( rotation point, default: 0.5, 0.5 ) .
     */
    constructor(width: number = 100, height: number = 100, anchor: Vector2 = new Vector2(0.5, 0.5)) {
        this._width = width;
        this._height = height;

        this._anchor = anchor;

        // calculate AABB box
        this.calcBox();

        // specify attribs needed for this buffer
        this.setAttribs();
        
        // set the buffer's data to what geometry() function returns
        this._buffer.setData(this.geometry());
    };

    /**
     * Find min/max X/Y as well as anchorPoint and make box dimensions out of it
     */
    protected calcBox(): void {
        // find min/max X/Y
        this._minX = -(this._width * this._anchor.x);
        this._maxX = this._width * (1.0 - this._anchor.x);
        
        this._minY = -(this._height * this._anchor.y);
        this._maxY = this._height * (1.0 - this._anchor.y);
        
        // make sure to also get anchorPoint
        this._anchorPoint.x = this._minX + (this._width * this._anchor.x);   
        this._anchorPoint.y = this._minY + (this._height * this._anchor.y);
    };

    /**
     * Specify the attributes needed for this buffer.
     */
    protected abstract setAttribs(): void;

    /**
     * Returns an array with buffer data ( vertexPos, texturePos, etc. )
     */
    protected abstract geometry(): number[];


    public get anchor(): Vector2 {
        return this._anchor;
    };

    public get buffer(): GLBuffer {
        return this._buffer;
    };
};
