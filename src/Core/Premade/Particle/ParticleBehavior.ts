import { TBehavior } from "@ecs/Behaviors/IBehavior";
import { TComponent } from "@ecs/Components/IComponent";
import ParticleComponent from "@premade/Particle/ParticleComponent";
import Vector2 from "@physics/Vector";

// Particle movement behavior
export default class ParticleBehavior extends TBehavior{
    // the physical component of the particle entity
    particleSprite: ParticleComponent;

    constructor(){
        super("ParticleBehavior");
    };

    start(){
        // get the component from the sprite owner
        this.particleSprite = this.owner.getComponentByName("Particle") as ParticleComponent;

        // set the owner's default position to something else
        this.owner.transform.position = new Vector2(100, 100);
    };

    update(dt:number){
        // called on every frame update
        // this.owner.transform.position = Vector2.multiply(
        //     Vector2.add(this.owner.transform.position, Vector2.forward),
        //     Vector2.fromDeltaTime(dt)
        // );

        this.owner.transform.position = Vector2.add(this.owner.transform.position, Vector2.forward);
        this.particleSprite.position = this.owner.transform.position;
    };
};