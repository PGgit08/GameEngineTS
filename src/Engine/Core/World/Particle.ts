import { TBehavior } from "@ecs/Behavior/IBehavior";
import { TEntity } from "@ecs/TEntity";
import { DrawComponent } from "@graphics/DrawComponent";
import { Circle2D } from "@graphics/Shape2D/Circle2D";
import { Vector2 } from "@physics/Vector";

// cannot overwrite TEntity update, so must create behavior which
// possibly can be an issue
export class ParticleBehavior extends TBehavior{
    constructor(){
        super("ParticleBehavior");
    };

    update(dt: number){
        // default movement
        // this.owner.worldTransform.position.add(this.owner.velocity);
    };
};      

export class Particle extends TEntity{
    // the radius of the particle
    public particleSize: number;

    // physics properties
    public velocity: Vector2;
    public acceleration: Vector2;

    /**
     * Create a new circular physical Particle
     * @param size Optional Parameter for the size of the Particle(default: 10)
     */
    constructor(
        size?: number,
        vel?: Vector2,
        acc?: Vector2
    ){
        // create a new entity called "Particle"
        super("Particle");

        // set properties from config
        this.particleSize = size || 10;
        this.velocity = vel || Vector2.one;
        this.acceleration = acc || Vector2.origin;


        // create the graphics component add drawable
        const graphics: DrawComponent = new DrawComponent();
        graphics.setCurrentDrawing(new Circle2D(this.particleSize));

        // add needed components/behaviors to this particle
        this.addComponent(graphics);
        this.addBehavior(new ParticleBehavior());
    };

    update(dt: number){
        super.update(dt);
    };
}; 