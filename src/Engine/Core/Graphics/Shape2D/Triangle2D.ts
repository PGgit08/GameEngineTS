// import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
// import { ShaderManager } from "@graphics/ShaderManager";
// import { Mesh } from "@graphics/Mesh";

// /**
//  * A Mesh for a 2D triangle
//  */
// export class Triangle2D extends Mesh{ 
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

//     loadGeometry(): void{
//         let posAttribute: AttributeInfo = new AttributeInfo();

//         posAttribute.location = this._material.shader.getAttributeLocation('coords');
//         posAttribute.size = 2;

//         this._geometry.addAttribute(posAttribute);

//         this._geometry.setData(
//             [
//                 this._minX, this._minY,
//                 this._minX, this._maxY,
//                 this._maxX, this._maxY
//             ]
//         );
//     };
// };