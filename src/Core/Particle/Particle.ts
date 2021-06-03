import { TEntity } from "@ecs/TEntity";
import ParticleBehavior from "Core/Particle/ParticleBehavior";
import { RendererProps } from "@renderer/IViewProps";
import { DrawComponent } from "@graphics/DrawComponent";
import { Circle2D } from "@graphics/Shape2D/Circle2D";
import { Vector2 } from "@physics/Vector";
import { RigidBody } from "@physics/RigidBody";
import { Rectangle2D } from "@graphics/Shape2D/Rectangle2D";

/**
 * @description A circular "particle" that follows a physics pattern.
 * @author Peter Gutkovich
 */
export class Particle extends TEntity{
    // the radius of this particle
    particleSize: number = 100;

    // the graphics component?
    graphics: DrawComponent;

    /**
     * Creates a new particle entity,
     * With the name of "Particle".
     */
    constructor(){
        // create a new entity with the name Particle and add needed components+behaviors
        super("Particle", [new DrawComponent()], [new ParticleBehavior()]);

        this.graphics = this.getComponent(DrawComponent);
        // this.graphics.setCurrentDrawing(new Circle2D(this.particleSize));
        this.graphics.setCurrentDrawing(new Rectangle2D(this.particleSize, this.particleSize));
    };
};