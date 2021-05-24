import TEntity from "@ecs/TEntity";
import ParticleBehavior from "Core/Particle/ParticleBehavior";
import { RendererProps } from "@renderer/IViewProps";
import DrawComponent from "@graphics/DrawComponent";
import Circle2D from "@graphics/Shape2D/Circle2D";
import Vector2 from "@physics/Vector";

/**
 * @description A circular "particle" that follows a physics pattern.
 * @author Peter Gutkovich
 */
export default class Particle extends TEntity{
    // ParticleBehavior
    // Focuses on movement and physics of a particle
    behavior: ParticleBehavior;

    // the radius of this particle
    particleSize: number = 5;

    // the graphics component?
    graphics: DrawComponent;

    /**
     * Creates a new particle entity,
     * With the name of "Particle".
     */
    constructor(){
        // create a new entity with the name Particle
        super("Particle", [new DrawComponent()]);

        // create a new ParticleBehavior for this particle
        this.behavior = new ParticleBehavior();
        this.addBehavior(this.behavior);

        this.graphics = this.getComponentByName("DrawComponent") as DrawComponent;
        this.graphics.setCurrentDrawing(new Circle2D(this.particleSize));
    };
};