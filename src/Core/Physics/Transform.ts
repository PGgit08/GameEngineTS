import Vector2 from '@physics/Vector';

/**
 * Basic tranfrom of an entity.
 */

export default class Transform{
    // position vector(defaults to origin)
    private _position: Vector2 = Vector2.origin;
    private _rotation: number = 0;
    private _scale: Vector2 = Vector2.forward;

    constructor(){
        // nothing here yet
    };

    /*
    * NOTE: Tranform properties are gotten/set like
    * this for now, but later a matrix will most likely
    * be used.  
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

};
