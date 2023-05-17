import { mat3 } from "gl-matrix";
import { Entity } from "../ecs/Entity";

export class Camera extends Entity {
    constructor(name: string) {
        super(name);
    }
    
    public view(): mat3 {
        // identity for now
        // return mat3.create();
        return this.worldMatrix;
    }
}
