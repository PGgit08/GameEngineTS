import { Lifecycle } from "../Lifecycle";
import { EventEmmiter } from "../events/EventEmmiter";
import { Transform } from "../math/Transform";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

/**
 * @classdesc
 * A hierarchy GameObject that can be added as a child to a {@link Entity}. It is abstract and meant to be overriden. This class implements the 
 * {@link Lifecycle} interface and its Lifecycle methods are called whenever its parent Entity's Lifecycle methods are called. However,
 * its {@link load} method is not only called during the loading period, but also when this Component is added into the heirarchy. 
 * 
 * @class Component
 * @extends GameObject
 * @abstract
 * @implements {Lifecycle}
 * 
 * @param {string} name - The name of this Component.
 */
export abstract class Component extends GameObject implements Lifecycle {
    private _enabled: boolean = true;

    private _parent: Entity = null;
    private _parentScene: Scene = null;

    /** The {@link EventEmmiter} belonging to this Component. */
    public readonly eventEmmiter: EventEmmiter = new EventEmmiter("COMPONENT_EVENT_EMMITER");

    // the events belonging to this component
    private _PARENT_SCENE_CHANGE_EVENT: Event<Scene[]> = new Event(Events.PARENT_SCENE_CHANGE, this.eventEmmiter);
    private _PARENT_CHANGE_EVENT: Event<Entity[]> = new Event(Events.PARENT_CHANGE, this.eventEmmiter);

    /** @returns {Entity} The parent Entity of this Component. */
    public get parent(): Entity {
        return this._parent;
    }

    /**
     * Sets the parent of this Component.
     * !!! SHOULD NEVER BE SET DIRECTLY !!!
     */
    public set parent(parent: Entity) {
        const oldParent = this._parent;
        this._parent = parent;

        this._PARENT_CHANGE_EVENT.invoke([oldParent, parent]);
    }

    /** @returns {Scene} The parent Scene of this Component. */
    public get parentScene(): Scene {
        return this._parentScene;
    }

    /**
     * Sets the parentScene of this Component.
     * !!! SHOULD NEVER BE SET DIRECTLY !!!
     */
    public set parentScene(parentScene: Scene) {
        const oldParentScene = this._parentScene;
        this._parentScene = parentScene;
        
        this._PARENT_SCENE_CHANGE_EVENT.invoke([oldParentScene, parentScene]);
    }

    /**
     * @returns {Entity} The Transform of this Component's parent Entity.
     */
    public get transform(): Transform {
        return this._parent === null ? null : this._parent.transform;
    }

    public set enabled(enabled: boolean) {
        this.enabled = enabled;
    }

    /**
     * @returns {boolean} Whether this Component is enabled, if it's not, it won't be updated or rendered. 
     */
    public get enabled(): boolean {
        return this._enabled;
    }

    constructor(name: string) {
        super(name, true);
    }

    public load(): void {};

    public abstract update(): void;
    public abstract render(): void;
}
