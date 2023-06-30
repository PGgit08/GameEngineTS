import { Lifecycle } from "../Lifecycle";
import { EventEmmiter } from "../events/EventEmmiter";
import { Transform } from "../math/Transform";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

export abstract class Component extends GameObject implements Lifecycle {
    private _enabled: boolean;

    private _started: boolean = false;

    private _parent: Entity = null;
    private _parentScene: Scene = null;

    public readonly eventEmmiter: EventEmmiter = new EventEmmiter();

    // the events belonging to this component
    private _PARENT_SCENE_CHANGE_EVENT: Event<Scene[]> = new Event(Events.PARENT_SCENE_CHANGE, this.eventEmmiter);
    private _PARENT_CHANGE_EVENT: Event<Entity[]> = new Event(Events.PARENT_CHANGE, this.eventEmmiter);

    /** The parent Entity of this Component. */
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

    /** The parent Scene of this Component. */
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
     * The Transform of the parent Entity.
     */
    public get transform(): Transform {
        return this._parent === null ? null : this._parent.transform;
    }

    public set enabled(enabled: boolean) {
        this.enabled = enabled;
    }

    public get enabled(): boolean {
        return this._enabled;
    }

    constructor(name: string) {
        super(name, true);
    }

    public load(): void {};

    /** Called once in this Component's lifetime when it is first enabled. */
    public abstract start(): void;
    public abstract update(): void;
    public abstract render(): void;
}
