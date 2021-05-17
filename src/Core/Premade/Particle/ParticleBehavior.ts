import { TBehavior } from "@ecs/Behaviors/IBehavior";
import { TComponent } from "@ecs/Components/IComponent";
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
        // called on every frame update
        this.owner.transform.position = new Vector2(100, 200);
    };
};