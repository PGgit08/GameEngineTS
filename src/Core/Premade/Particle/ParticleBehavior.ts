import { TBehavior } from "@ecs/Behaviors/IBehavior";
// import { TComponent } from "@ecs/Components/IComponent";
import Vector2 from "@physics/Vector";

// Particle movement behavior
export default class ParticleBehavior extends TBehavior{
    constructor(){
        super("ParticleBehavior");
    };

    start(){
        // called at the begginning of the game loop
        this.owner.transform.position = new Vector2(100, 200);
    };

    update(dt:number){
        // move up by default for now
        this.owner.transform.position.add(Vector2.forward);
    };
};