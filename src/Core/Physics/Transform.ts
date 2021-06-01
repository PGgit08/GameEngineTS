import { Vector2 } from '@physics/Vector';
import { mat2d, vec2 } from 'gl-matrix';

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
        // convert GETS vector into glMatrix vector
        const tVector = vec2.fromValues(this._position.x, this._position.y);
        const sVector = vec2.fromValues(this._scale.x, this._scale.y);

        // turn translation/rotation/scale into matricies
        let translate = mat2d.fromTranslation(mat2d.create(), tVector);
        let rotation = mat2d.fromRotation(mat2d.create(), this._rotation * Math.PI / 180);
        let scale = mat2d.fromScaling(mat2d.create(), sVector);


        // multiply all transformation matricies to create one big matrix function
        return mat2d.multiply(mat2d.create(), mat2d.multiply(mat2d.create(), translate, scale), rotation);
    };

};
