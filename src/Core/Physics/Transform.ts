import { GLMatrix4 } from '@gl/GLMatrix4';
import { Vector2 } from '@physics/Vector';

/**
 * Basic tranfrom of an entity.
 */

export class Transform{
    // position vector(defaults to origin)
    private _position: Vector2 = Vector2.one;
    private _rotation: number = 0;
    private _scale: Vector2 = Vector2.one;

    constructor(){
        // nothing here yet
    };

    /*
    * NOTE: Matricies for preforming transformations will be used later.
    */
    
    public get position(): Vector2{
        return this._position;
    };

    public get rotation(): number{
        return this._rotation;
    };

    public get scale(): Vector2{
        return this._scale;
    };

    public set position(p: Vector2){
        this._position = p;
    };

    public set rotation(r: number){
        this._rotation = r;
    };

    public set scale(s: Vector2){
        this._scale = s;
    };

    /**
     * Converts transform into a matrix
     * @returns glMatrix mat2d item
     */
    public toMatrix(){
        // turn translation/rotation/scale into matricies
        let translate = GLMatrix4.translation(this._position);
        let rotation = GLMatrix4.rotation(this._rotation * Math.PI / 180);
        let scale = GLMatrix4.scale(this._scale);


        // multiply all transformation matricies to create one big matrix funvction
        return GLMatrix4.mul(GLMatrix4.mul(translate, rotation), scale);
    };

};
