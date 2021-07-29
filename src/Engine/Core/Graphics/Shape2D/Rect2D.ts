import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { Renderable } from "@graphics/Renderable";

/**
 * A Drawable for a 2D Rectangle
 */
export class Rect2D extends Renderable{ 
    /**
     * Creates a new Drawable 2D Rectangle 
     * @param w The width of the rectangle
     * @param h The height of the rectangle
     */
    constructor(w: number, h: number){
        super();

        this._width = w;
        this._height = h;

        this.calcBox();
    };

    loadMesh(): void{
        this._mesh = new GLBuffer(GL.FLOAT, GL.ARRAY_BUFFER, GL.LINE_LOOP);

        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = this._material.shader.getAttributeLocation('coords');
        posAttribute.size = 2;

        this._mesh.addAttribute(posAttribute);

        /**
         * WebGL has some weird drawing order,
         * so this took like an hour to complete
         */
        this._mesh.setData(
            [
                this._minX, this._minY,
                this._minX, this._maxY,
                this._maxX, this._maxY,
                this._minX, this._minY,
                this._minX, this._maxY,
                this._maxX, this._maxY,
                this._minX, this._minY,
                this._maxX, this._minY,
                this._maxX, this._maxY
            ]
        );
    };
};
