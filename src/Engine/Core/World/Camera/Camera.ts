import { TEntity } from "@ecs/TEntity";
import { GLMatrix4 } from "@gl/GLMatrix4";

export class Camera extends TEntity{
    constructor(name: string){
        super(name);
    };

    public get view(): GLMatrix4{
        return this.worldTransform.toMatrix();
    };
};