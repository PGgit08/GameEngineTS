import { Entity } from "@ecs/Entity";

/*
Basically the same thing as a Component,
however doesn't contain a render method,
and focuses more on pre-render update operations
like movement for example.
*/
export abstract class Behavior {
    private _name: string

    public owner: Entity;

    /**
     * Creates a new behavior.
     * @param name The name of the behavior.
     */
    constructor(name: string){
        this._name = name;
    };

    public get name(): string {
        return this._name;
    };

    public set name(name: string) {
        this._name = name;
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
    abstract start(): void;

    /**
     * The loop operations of this behavior, called on each frame update.
     * @param dt The delta time since the last update call.
     */
    abstract update(): void;
};