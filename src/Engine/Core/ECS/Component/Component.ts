import { Entity } from '@ecs/Entity'; 


/**
 * A component that can be attached to an Entity.
 * Typically something visual.
 */
export abstract class Component {
    name: string

    owner: Entity;


    /**
     * Creates a new component.
     * @param name The name of the component.
     */
    constructor(name: string){
        this.name = name;
    };

    /**
     * @deprecated (later when _name is private)
     * Gets name of this component.
     */
    public get getName(): string {
        return this.name
    };

    /**
     * Set's the owner of this component.
     * @param o The owner Entity.
     */
    setOwner(o: Entity): void {
        this.owner = o;
    };

    /**
     * The pre-loop operations of this component.
     */
    start(): void {};

    /**
     * The loop operations of this component, called on each frame update.
     * @param dt The delta time since the last update call.
     */
    update(): void {};

    /**
     * The render operations of this component.
     */
    render(): void {};
};
