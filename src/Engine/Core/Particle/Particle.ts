import { TEntity } from "Engine/Core/ECS/TEntity";
import ParticleBehavior from "Engine/Core/Particle/ParticleBehavior";
import { RendererProps } from "Engine/Core/Renderer/IViewProps";
import { DrawComponent } from "Engine/Core/Graphics/DrawComponent";
import { Circle2D } from "Engine/Core/Graphics/Shape2D/Circle2D";
import { Vector2 } from "Engine/Core/Physics/Vector";
import { RigidBody } from "Engine/Core/Physics/RigidBody";
import { Rectangle2D } from "Engine/Core/Graphics/Shape2D/Rectangle2D";

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