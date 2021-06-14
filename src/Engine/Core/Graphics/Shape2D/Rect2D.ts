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
    };

    makeBuffer(): void{
        ShaderManager.SetShader('Shader2D');
        this._shader = ShaderManager.ACTIVE_SHADER;

        this._buffer = new GLBuffer();

        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = this._shader.getAttributeLocation('coords');
        posAttribute.size = 2;

        this._buffer.addAttribute(posAttribute);

        /**
         * WebGL has some weird drawing order,
         * so this took like an hour to complete
         */
        this._buffer.setData(
            [
                0, 0,
                0, this._height,
                this.width, this._height,
                0, 0,
                this._width, 0,
                this._width, this._height
            ]
        );
    };
};