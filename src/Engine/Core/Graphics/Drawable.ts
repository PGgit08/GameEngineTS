import { GLBuffer } from "@gl/GLBuffer";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { Vector2 } from "@physics/Vector";

/**
 * Low-Level abstract class, that items which get drawn to the screen can inherit.
 * @example Sprite   
 */
export abstract class Drawable{
    // point of rotation for drawable item(defaults to half)
    public origin: Vector2 = new Vector2(0.5, 0.5);

    // the width and height of this Drawable
    protected _width: number = 100;
    protected _height: number = 100;

    // the WebGL buffer and shaders for this Drawable item
    protected _buffer: GLBuffer;
    protected _shader: GLShader;

    // the min/max X calculated with origin and width(can be useful for AABB)
    protected _minX: number = -(this._width * this.origin.x);
    protected _maxX: number = this._width * this.origin.y;
    
    // the min/max Y calculated with origin and height(can be useful for AABB)
    protected _minY: number = -(this._height * this.origin.y);
    protected _maxY: number = this._height * this.origin.y;


    /**
     * Find min/max X/Y and make a box
     */
    protected calcBox(): void{
        this._minX = -(this._width * this.origin.x);
        this._maxX = this._width * this.origin.y;
        this._minY = -(this._height * this.origin.y);
        this._maxY = this._height * this.origin.y;
    };

    /**
     * A pre-drawing method for a graphic in which to preform transforms.
     * @param pos The position vector at which to preform transforms.
     */
    protected _preDraw(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void{
        // prefrom translate to origin
        // and transformations based on matrix
        this._shader.ApplyStandardUniforms(model, projection, view);
    
    };  

    /**
     * A post-drawing method for a graphic.
     */
    protected _postDraw(): void{
        this._buffer.bind();
        this._buffer.draw();
    };

    /**
     * A draw method to preform tranforming and rendering.
     * @param pos The position to the transforming/rendering.
     */
    public draw(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void{
        this._preDraw(model, projection, view);
        this._postDraw();
    };

    /**
     * Must by overwritten by drawables.
     * Method creates/sets buffer and returns it.
     */
    protected abstract makeBuffer(): void;

    /**
     * Must by overwritten by drawables.
     * Method sets buffer and uploads it.
     */
    public uploadBuffer(): void{
        this.makeBuffer();

        this._buffer.upload();
        this._buffer.unbind();
    };
};