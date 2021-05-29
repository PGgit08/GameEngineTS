import { Vector2 } from "@physics/Vector";

/**
 * Low-Level abstract class, that items which get drawn to the screen can inherit.
 * @example Sprite   
 */
export abstract class Drawable{
    // point of rotation for drawable item
    public origin: Vector2;

    private _width: number = 0;
    private _height: number = 0;

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

    
    public scale: Vector2;
    public rotation: number;

    /**
     * A pre-drawing method for a graphic in which to preform transforms.
     * @param pos The position vector at which to preform transforms.
     */
    protected _preDraw(pos: Vector2): void{
        // translate to the position's x and y 
        // so that items drawn at 0,0 will be in the correct
        // location on the screen
        CTX.save();
        CTX.translate(pos.x, pos.y);
    };

    /**
     * A post-drawing method for a graphic.
     */
    protected _postDraw(): void{
        CTX.restore();
    };

    /**
     * A draw method to preform tranforming and rendering.
     * @param pos The position to the transforming/rendering.
     */
    public draw(pos: Vector2): void{
        this._preDraw(pos);
        this.execute(pos);
        this._postDraw();
    };

    /**
     * Classes inheriting Drawable override this abstract method.
     * @param pos The position to render at.
     */
    abstract execute(pos: Vector2): void;
};