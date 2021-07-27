import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
import { ShaderManager } from "@gl/ShaderManager";
import { Drawable } from "@graphics/Drawable";

/**
 * A Drawable for a 2D right triangle
//  */
// export class Triangle2D extends Drawable{ 
//     /**
//      * Creates a new Drawable 2D right triangle
//      * @param w The width of the triangle
//      * @param h The height of the triangle
//      */
//     constructor(w:number, h:number){
//         super();

//         this._width = w;
//         this._height = h;

//         this.calcBox();
//     };

//     // makeBuffer(): void{
//     //     ShaderManager.SetShader('Shader2D');
//     //     this._shader = ShaderManager.ACTIVE_SHADER;

//     //     this._buffer = new GLBuffer();

//     //     let posAttribute: AttributeInfo = new AttributeInfo();

//     //     posAttribute.location = this._shader.getAttributeLocation('coords');
//     //     posAttribute.size = 2;

//     //     this._buffer.addAttribute(posAttribute);

//     //     this._buffer.setData(
//     //         [
//     //             this._minX, this._minY,
//     //             this._minX, this._maxY,
//     //             this._maxX, this._maxY
//     //         ]
//     //     );
//     // };
// };
export class Triangle2D{};