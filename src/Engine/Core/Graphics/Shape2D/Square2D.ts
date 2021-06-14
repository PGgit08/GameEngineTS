import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderManager } from "@gl/ShaderManager";
import { Drawable } from "@graphics/Drawable";

export class Square2D extends Drawable{ 
    constructor(s: number){
        super();

        this._width = s;
        this._height = s;
    };

    loadBuffer(): void{
        ShaderManager.SetShader('Shader2D');
        this._shader = ShaderManager.ACTIVE_SHADER;

        this._buffer = new GLBuffer();

        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = this._shader.getAttributeLocation('coords');
        posAttribute.size = 2;

        console.log(posAttribute);
        console.log(this._shader);

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

        this._buffer.upload();
        this._buffer.unbind();
    };

    uploadBuffer(): void{

    };
};