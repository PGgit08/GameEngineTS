import Vector2 from "@physics/Vector";

/**
 * Low-Level abstract class, that items which get drawn to the screen can inherit.
 * @example Sprite   
 */
export default abstract class Drawable{
    // point of rotation for drawable item
    public origin: Vector2;

    private _width: number = 0;
    private _height: number = 0;

    /**
     * Get's width of IDrawable
     */
    public get width(): number{
        return this._width;
    };

    public set width(w: number){
        this._width = w;
    };

    /**
     * Gets Height of IDrawable
     */
    public get height(): number{
        return this._height;
    };

    public set height(h: number){
        this._height = h;
    };

    /**
     * Classes inheriting Drawable override this abstract method.
     */
    protected abstract draw(x: number, y: number): void;
};