import { Drawable } from "Engine/Core/Graphics/Drawable";

export class Rectangle2D extends Drawable{
    _w: number;
    _h: number;
    
    public get width(): number{
        return this._w;
    };
    
    public set width(w: number){
        this._w = w;
    };

    public get height(): number{
        return this._h;
    };

    public set height(h: number){
        this._h = h;
    };

    constructor(w:number, h:number){
        super();
        this._w = w;
        this._h = h;
        
        this._setDimensions();
    };

    private _setDimensions(){
        this.width = this._w;
        this.height = this._h;
    };

    execute(): void{
        CTX.rect(
            0,
            0,
            this._w,
            this._h
        )
    };
};