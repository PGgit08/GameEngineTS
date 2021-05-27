import { TBehavior } from "@ecs/Behavior/IBehavior";
// import { TComponent } from "@ecs/Components/IComponent";
import Vector2 from "@physics/Vector";

// Particle movement behavior
export default class ParticleBehavior extends TBehavior{
    constructor(){
        super("ParticleBehavior");
    };

    start(){
        // called at the begginning of the game loop
    };

    update(dt:number){
        // move up by default for now
        this.owner.transform.position.add(Vector2.forward);
    };
};