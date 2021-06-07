import { GLMatrix4 } from "@gl/GLMatrix4";
import { Vector2 } from "@physics/Vector";

/**
 * Low-Level abstract class, that items which get drawn to the screen can inherit.
 * @example Sprite   
 */
export abstract class Drawable{
    // point of rotation for drawable item(defaults to half)
    public origin: Vector2 = new Vector2(0.5, 0.5);

    private _width: number = 0;
    private _height: number = 0;

    private _buffer
    private _shader

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
    protected _preDraw(): void{
        // prefrom translate to origin
        // and transformations based on matrix
    };  

    /**
     * A post-drawing method for a graphic.
     */
    protected _postDraw(): void{
    };

    /**
     * A draw method to preform tranforming and rendering.
     * @param pos The position to the transforming/rendering.
     */
    public draw(): void{
        this._preDraw();
        this.execute();
        this._postDraw();
    };

    /**
     * Classes inheriting Drawable override this abstract method.
     * @param pos The position to render at.
     */
    abstract execute(): void;
};