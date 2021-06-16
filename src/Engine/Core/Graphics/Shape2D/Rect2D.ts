import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderManager } from "@gl/ShaderManager";
import { Drawable } from "@graphics/Drawable";

/**
 * A Drawable for a 2D Rectangle
 */
export class Rect2D extends Drawable{ 
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

    makeBuffer(): void{
        ShaderManager.SetShader('Shader2D');
        this._shader = ShaderManager.ACTIVE_SHADER;

        this._buffer = new GLBuffer(GL.FLOAT, GL.ARRAY_BUFFER, GL.POINTS);

        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = this._shader.getAttributeLocation('coords');
        posAttribute.size = 2;

        this._buffer.addAttribute(posAttribute);

        console.log(this._minX, this._minY, this._maxX, this._maxY);

        /**
         * WebGL has some weird drawing order,
         * so this took like an hour to complete
         */
        this._buffer.setData(
            [
                -10, -10,
                -10, 50,
                50, 50,
                // 100, 0,
                // 100, 100
                // this._minX, this._minY,
                // this._minX, this._maxY,
                // this._maxX, this._maxY
                // this._minX, this._minY,
                // this._minX, this._maxY,
                // this._maxX, this._maxY,
                // this._minX, this._minY,
                // this._maxX, this._minY,
                // this._maxX, this._maxY
            ]
        );
    };
};