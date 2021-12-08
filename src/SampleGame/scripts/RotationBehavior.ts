import { Behavior } from "@ecs/Behavior/Behavior";
import { Renderer } from "@GETS";

/**
 * Simple pre-build rotation behavior for an entity.
 */
export class RotationBehavior extends Behavior {
    private _rotationSpeed: number;

    /**
     * Rotates this entity.
     * @param rotationSpeed The speed of rotation ( degrees per second ) 
     */
    constructor(rotationSpeed: number){
        super("RotationBehavior");
        
        this._rotationSpeed = rotationSpeed;
    };

    update(){
        this.owner.Transform.rotation += this._rotationSpeed * Renderer.DeltaTime;
    };
};