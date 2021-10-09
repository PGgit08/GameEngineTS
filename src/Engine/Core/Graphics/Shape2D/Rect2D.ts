// import { AttributeInfo, GLBuffer } from "@gl/GLBuffer";
// import { Mesh } from "@graphics/Mesh";

// /**
//  * A Mesh for a 2D Rectangle
//  */
// export class Rect2D extends Mesh{ 
//     /**
//      * Creates a new Drawable 2D Rectangle 
//      * @param w The width of the rectangle
//      * @param h The height of the rectangle
//      */
//     constructor(w: number, h: number){
//         super();

//         this._width = w;
//         this._height = h;

//         this.calcBox();
//     };

//     loadGeometry(): void{
//         // this._geometry = new GLBuffer(GL.FLOAT, GL.ARRAY_BUFFER, GL.LINE_LOOP);
//         this._geometry = new GLBuffer();

//         let posAttribute: AttributeInfo = new AttributeInfo();

//         posAttribute.location = this._material.shader.getAttributeLocation('coords');
//         posAttribute.size = 2;

//         this._geometry.addAttribute(posAttribute);

//         /**
//          * WebGL has some weird drawing order,
//          * so this took like an hour to complete
//          */
//         this._geometry.setData(
//             [
//                 this._minX, this._minY,
//                 this._minX, this._maxY,
//                 this._maxX, this._maxY,
//                 this._minX, this._minY,
//                 this._minX, this._maxY,
//                 this._maxX, this._maxY,
//                 this._minX, this._minY,
//                 this._maxX, this._minY,
//                 this._maxX, this._maxY
//             ]
//         );
//     };
// };
