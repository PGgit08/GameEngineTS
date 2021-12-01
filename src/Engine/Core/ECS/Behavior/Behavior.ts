import { Entity } from "@ecs/Entity";

/*
Basically the same thing as a Component,
however doesn't contain a render method,
and focuses more on pre-render update operations
like movement for example.
*/
export abstract class Behavior {
    name: string

    owner: Entity;

    /**
     * Creates a new behavior.
     * @param name The name of the behavior.
     */
    constructor(name: string){
        this.name = name;
    };

    /**
     * @deprecated (later when _name is private)
     * Gets name of this behavior.
     */
    public get getName(): string{
        return this.name
    };

    /**
     * Set's the owner of this behavior.
     * @param o The owner Entity.
     */
    setOwner(o: Entity){
        this.owner = o;
    };

    /**
     * The pre-loop operations of this behavior.
     */
    start(){};

    /**
     * The loop operations of this behavior, called on each frame update.
     * @param dt The delta time since the last update call.
     */
    update(){};
};