import { TBehavior } from "@ecs/Behavior/IBehavior";

/**
 * Simple pre-build rotation behavior for an entity.
 */
export class RotationBehavior extends TBehavior{
    constructor(){
        super("RotationBehavior");
    };

    update(dt: number){
        super.update(dt);

        // no deltaTime implement cuz confused 🤔
        this.owner.localTransform.rotation += 1;
    };
};