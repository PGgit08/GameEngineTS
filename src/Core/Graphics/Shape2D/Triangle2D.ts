import { GLBuffer } from "@gl/GLBuffer";
import { Drawable } from "@graphics/Drawable";

export class Triangle2D extends Drawable{ 
    constructor(w:number, h:number){
        super();

        this._width = w;
        this._height = h;

        this._buffer.setData(
            [
                0, this._height,
                this._width, this._height,
                this._width, 0
            ]
        );
    };
};