import { TEntity } from "@ecs/TEntity";
import { GLMatrix4 } from "@gl/GLMatrix4";

export class Camera extends TEntity{
    constructor(name: string){
        super(name);
    };

    /**
     * Calculates the view matrix based on camera movement.
     */
    public get view(): GLMatrix4{
        // so far just return normal world transform
        // but later add matrix inverse
        // console.log(this.worldTransform.position);
        this.getWorldMatrix();
        return this._worldMatrix;
    };
};