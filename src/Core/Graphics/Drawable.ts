import { Vector2 } from "@physics/Vector";
import { mat2d } from "gl-matrix";

/**
 * Low-Level abstract class, that items which get drawn to the screen can inherit.
 * @example Sprite   
 */
export enum TransformPos{
    SX = 0,
    SY = 3,
    RX = 1,
    RY = 2,
    X = 4,
    Y = 5
};

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
    protected _preDraw(mat: mat2d): void{
        // translate to the position's x and y 
        // so that items drawn at 0,0 will be in the correct
        // location on the screen
        CTX.save();
        CTX.transform(
            mat[TransformPos.SX],
            mat[TransformPos.RX],
            mat[TransformPos.RY],
            mat[TransformPos.SY],
            mat[TransformPos.X],
            mat[TransformPos.Y]
        );
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
    public draw(mat: mat2d): void{
        this._preDraw(mat);
        this.execute();
        this._postDraw();
    };

    /**
     * Classes inheriting Drawable override this abstract method.
     * @param pos The position to render at.
     */
    abstract execute(): void;
};