import { Entity } from "@ecs/Entity";
import { RenderComponent } from "@graphics/RenderComponent";
import { Mesh } from "@graphics/Mesh";
import { ColorMaterial } from "@graphics/Materials/ColorMaterial";

// Geometries
import { Ellipse } from "@graphics/Geometry/Ellipse";

/**
 * Just a basic entity which is just a simple Ellipse.
 */
export class Particle extends Entity {
    // the radius of the particle
    private _particleSize: number;

    /**
     * Create a new circular physical Particle.
     * @param size Parameter for the radius of the Particle ( default: 50 ).
     */
    constructor(
        size: number = 50,
    ){
        // create the RenderComponent that associates to this Particle
        const renderer: RenderComponent = new RenderComponent();
        
        // set the mesh of the render component
        renderer.mesh = new Mesh(new Ellipse(size, size), new ColorMaterial());

        // create a new entity called "Particle"
        super("Particle", [renderer]);

        // set properties of this entity
        this._particleSize = size;
    };
};
