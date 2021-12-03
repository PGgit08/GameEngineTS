import { Behavior } from "@ecs/Behavior/Behavior";
import { Renderer } from "@GETS";

/**
 * Simple pre-build rotation behavior for an entity.
 */
export class RotationBehavior extends Behavior{
    constructor(){
        super("RotationBehavior");
    };

    update(){
        // no deltaTime implement cuz confused 🤔
        this.owner.Transform.rotation += 1 * Renderer.DeltaTime;
    };
};