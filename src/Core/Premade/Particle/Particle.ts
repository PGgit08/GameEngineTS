import TEntity from "@ecs/TEntity";
import ParticleBehavior from "@premade/Particle/ParticleBehavior";
import { RendererProps } from "@renderer/IViewProps";

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

    /**
     * Creates a new particle entity,
     * With the name of "Particle".
     */
    constructor(){
        // create a new entity with the name Particle
        super("Particle");

        // create a new ParticleBehavior for this particle
        this.behavior = new ParticleBehavior();
        this.addBehavior(this.behavior);
    };


    /**
     * @deprecated Sprite component will do this already.
     */
    render(renderProps: RendererProps){
        /* 
            NOTE: 
            This entity will have a Sprite 
            component which has the shape of a 
            circle, but for now access CTX here and
            render here.
        */
        CTX.beginPath();
        CTX.arc(this.transform.position.x, this.transform.position.y, this.particleSize, 0, 2 * Math.PI);
        CTX.stroke();
    };
};