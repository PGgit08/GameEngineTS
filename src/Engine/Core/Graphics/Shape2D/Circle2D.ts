import { Drawable } from 'Engine/Core/Graphics/Drawable';
import { Vector2 } from 'Engine/Core/Physics/Vector';

export class Circle2D extends Drawable{
    // radius of the circle  
    private _radius: number;

    public get radius(): number{
        return this._radius;
    };

    public set radius(r: number){
        this._radius = r;
        this._setDimensions();
    };

    private _setDimensions(){
        this.width = this._radius * 2;
        this.height = this._radius * 2;
    };

    constructor(r: number){
        super() // must call super even if abstract class
        this._radius = r;
        this._setDimensions();
    };

    // call the draw method of Drawable
    execute(){
        CTX.beginPath();
        CTX.arc(this._radius, this._radius, this._radius, 0, 2 * Math.PI);
        CTX.stroke();
    };
};