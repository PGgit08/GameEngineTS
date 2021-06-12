import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderManager } from "@gl/ShaderManager";
import { Drawable } from "@graphics/Drawable";

export class Square2D extends Drawable{ 
    constructor(w:number, h:number){
        super();

        this._width = w;
        this._height = h;
    };

    loadBuffer(): void{
        ShaderManager.SetShader('Shader2D');
        this._shader = ShaderManager.ACTIVE_SHADER;

        this._buffer = new GLBuffer(GL.FLOAT, GL.ARRAY_BUFFER, GL.TRIANGLE_FAN);

        let posAttribute: AttributeInfo = new AttributeInfo();

        posAttribute.location = this._shader.getAttributeLocation('coords');
        posAttribute.size = 2;

        console.log(posAttribute);
        console.log(this._shader);

        this._buffer.addAttribute(posAttribute);

        this._buffer.setData(
            [
                0, 0,
                0, this._width,
                this._height, this._width,
                0, this._height
            ]
        );

        this._buffer.upload();
        this._buffer.unbind();
    };

    uploadBuffer(): void{

    };
};