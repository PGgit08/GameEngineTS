import { TBehavior } from "@ecs/Behavior/IBehavior";

/**
 * Simple pre-build rotation behavior for an entity.
 */
export class RotationBehavior extends TBehavior {
    constructor(){
        super("RotationBehavior");
    };

    update(){
        super.update();

        // no deltaTime implement cuz confused 🤔
        this.owner.Transform.rotation += 1;
    };
};