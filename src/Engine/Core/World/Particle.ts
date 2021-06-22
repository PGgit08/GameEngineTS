import { TBehavior } from "@ecs/Behavior/IBehavior";
import { TEntity } from "@ecs/TEntity";
import { DrawComponent } from "@graphics/DrawComponent";
import { Circle2D } from "@graphics/Shape2D/Circle2D";
import { Vector2 } from "@physics/Vector";

// cannot overwrite TEntity update, so must create behavior which
// possibly can be an issue

/**
 * A physics behavior for the Particle, contains physics properties
 */
export class ParticleBehavior extends TBehavior{
    // physics properties
    public vel: Vector2;
    public acc: Vector2;

    private size: number;

    constructor(
        size: number,
        vel: Vector2,
        acc: Vector2
    ){
        super("ParticleBehavior");

        this.vel = vel;
        this.acc = acc;

        this.size = size
    };

    update(dt: number){
        // default movement
        this.owner.localTransform.position.add(this.vel);
        this.owner.localTransform.rotation += 1.0;
    };
};      

export class Particle extends TEntity{
    // the radius of the particle
    public particleSize: number;


    /**
     * Create a new circular physical Particle which runs on a ParticleBehavior.
     * @param size Parameter for the size of the Particle(default: 10)
     * @param vel Parameter for the velocity of the Particle(default: Vector2.one).
     * @param acc Parameter for the acceleration of the Particle(default: Vector2.origin).
     */
    constructor(
        size: number = 50,
        vel: Vector2 = Vector2.one, 
        acc: Vector2 = Vector2.origin
    ){
        // create a new entity called "Particle"
        super("Particle");

        // set properties of this entity
        this.particleSize = size;

        // create the graphics component add drawable
        const graphics: DrawComponent = new DrawComponent();
        graphics.setCurrentDrawing(new Circle2D(this.particleSize));

        // add needed components/behaviors to this particle
        this.addComponent(graphics);
        this.addBehavior(new ParticleBehavior(
            size,
            vel,
            acc
        ));
    };

    update(dt: number){
        super.update(dt);
    };
}; 