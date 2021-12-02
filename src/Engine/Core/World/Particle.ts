import { TBehavior } from "@ecs/Behavior/IBehavior";
import { TEntity } from "@ecs/TEntity";
import { RenderComponent } from "@graphics/RenderComponent";
import { Vector2 } from "@physics/Vector";
import { Renderer } from "@renderer/Renderer";
import { Circle, Color, ColorMaterial, Mesh } from "@GETS";
import { ColorChanger } from "../../../SampleGame/scripts/ColorChanger";


/**
 * A physics behavior for the Particle, contains physics properties
 */
export class ParticleBehavior extends TBehavior {
    // physics properties
    public vel: Vector2;
    public acc: Vector2;

    private size: number;

    constructor(
        vel: Vector2,
        acc: Vector2,
        size: number
    ){
        super("ParticleBehavior");

        this.vel = vel;
        this.acc = acc;

        this.size = size;
    };

    update(){
        // basic collision implementation for fun
        if(this.owner.Transform.position.x == Renderer.Width - this.size 
            || this.owner.Transform.position.x == this.size){
                this.vel.x = -this.vel.x;
        };

        if(this.owner.Transform.position.y == Renderer.Height - this.size
            || this.owner.Transform.position.y == this.size){
                this.vel.y = -this.vel.y;
        };
    
        // default movement
        this.owner.Transform.position.add(Vector2.withDelta(this.vel));
        // this.owner.Transform.rotation += 360 * Renderer.DeltaTime;
    };
};      


export class Particle extends TEntity {
    // the radius of the particle
    public particleSize: number;

    a: number = 0;


    /**
     * Create a new circular physical Particle which runs on a ParticleBehavior.
     * @param size Parameter for the size of the Particle(default: 10)
     * @param vel Parameter for the velocity of the Particle(default: Vector2.right).
     * @param acc Parameter for the acceleration of the Particle(default: Vector2.origin).
     */
    constructor(
        size: number = 50,
        vel: Vector2 = new Vector2(10, 10), 
        acc: Vector2 = Vector2.origin
    ){
        // create a new entity called "Particle"
        super("Particle");

        // set properties of this entity
        this.particleSize = size;

        // create the RenderComponent that associates to this Particle
        const renderer: RenderComponent = new RenderComponent();

        // set the mesh of the render component
        renderer.mesh = new Mesh(new Circle(size, size), new ColorMaterial());

        // add needed components/behaviors to this particle
        this.addComponent(renderer);
        // this.addBehavior(new ParticleSummoner());
        this.addBehavior(new ColorChanger());
        this.addBehavior(new ParticleBehavior(vel, acc, size));
    };
}; 