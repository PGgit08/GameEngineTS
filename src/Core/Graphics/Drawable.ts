import { Vector2 } from "@physics/Vector";
import { mat2d, vec2 } from "gl-matrix";

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
    // point of rotation for drawable item(defaults to half)
    public origin: Vector2 = new Vector2(0.5, 0.5);

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
        // prefrom translate to origin
        // and transformations based on matrix
        CTX.save();
        CTX.translate(mat[TransformPos.X], mat[TransformPos.Y]);
        // CTX.scale(mat[TransformPos.SX], mat[TransformPos.SY]);
    };  

    /**
     * A post-drawing method for a graphic.
     */
    protected _postDraw(): void{
        CTX.stroke();
        // CTX.fill();
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