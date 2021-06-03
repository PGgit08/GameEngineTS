import { TBehavior } from "Engine/Core/ECS/Behavior/IBehavior";
// import { TComponent } from "@ecs/Components/IComponent";
import { Vector2 } from "Engine/Core/Physics/Vector";

/**
 * A testing behavior for particles
 */
export default class ParticleBehavior extends TBehavior{
    constructor(){
        super("ParticleBehavior");
    };

    start(){
        // called at the begginning of the game loop
    };

    update(dt:number){
        // testing transformations
        // console.log(this.owner.worldMatrix);
        // this.owner.worldTransform.scale.subtract(new Vector2(0.01, 0));
        // this.owner.worldTransform.position.add(Vector2.forward);
        this.owner.worldTransform.rotation += 1;
    };
};