import { Behavior } from "@ecs/Behavior/Behavior";
import { Entity } from "@ecs/Entity";
import { RenderComponent } from "@graphics/RenderComponent";
import { Vector2 } from "@physics/Vector";
import { Renderer } from "@renderer/Renderer";
import { Geometry } from "@graphics/Geometry/Geometry";
import { Mesh } from "@graphics/Mesh";
import { ColorMaterial } from "@graphics/Materials/ColorMaterial";

// geometries
import { Circle } from "@graphics/Geometry/Circle";
import { Rect } from "@graphics/Geometry/Rect";
import { RightTriangle } from "@graphics/Geometry/RightTriangle";


/**
 * A physics behavior for the Particle, contains physics properties
 */
export class ParticleBehavior extends Behavior {
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

    update() {
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


export class Particle extends Entity {
    // the radius of the particle
    private _particleSize: number;

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
        // create the RenderComponent that associates to this Particle
        const renderer: RenderComponent = new RenderComponent();
        
        // set the mesh of the render component
        renderer.mesh = new Mesh(new Circle(size, size), new ColorMaterial());

        // create a new entity called "Particle"
        super("Particle", [renderer]);

        // set properties of this entity
        this._particleSize = size;
    };
}; 