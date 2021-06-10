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

    protected _width: number = 0;
    protected _height: number = 0;

    // the WebGL buffer and shaders for this Drawable item
    protected _buffer: GLBuffer;
    protected _shader: GLShader;

    public get width(): number{
        return this._width;
    };

    public set width(w: number){
        this._width = w;
    };

    public get height(): number{
        return this._height;
    };

    public set height(h: number){
        this._height = h;
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
        this.uploadBuffer();
        this._postDraw();
    };

    /**
     * Must be overwritten by drawables.
     * Method sets attributes for buffer.
     */
    public abstract loadBuffer(): void;

    /**
     * Must by overwritten by drawables.
     * Method sets buffer and uploads it.
     */
    protected abstract uploadBuffer(): void;
};