import { Lifecycle } from "../Lifecycle";
import { EventEmmiter } from "../events/EventEmmiter";
import { Transform } from "../math/Transform";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

export abstract class Behavior extends GameObject implements Lifecycle {
    private _parent: Entity = null;
    private _parentScene: Scene = null;

    public readonly eventEmmiter: EventEmmiter = new EventEmmiter();

    // the events belonging to this behavior
    private _PARENT_SCENE_CHANGE_EVENT: Event<Scene[]> = new Event(Events.PARENT_SCENE_CHANGE, this.eventEmmiter);
    private _PARENT_CHANGE_EVENT: Event<Entity[]> = new Event(Events.PARENT_CHANGE, this.eventEmmiter);

    /** The parent Entity of this Behavior. */
    public get parent(): Entity {
        return this._parent;
    }

    public set parent(parent: Entity) {
        const oldParent = this._parent;
        this._parent = parent;

        this._PARENT_CHANGE_EVENT.invoke([oldParent, parent]);
    }

    /** The parent Scene of this Behavior. */
    public get parentScene(): Scene {
        return this._parentScene;
    }

    public set parentScene(parentScene: Scene) {
        const oldParentScene = this._parentScene;
        this._parentScene = parentScene;
        
        this._PARENT_SCENE_CHANGE_EVENT.invoke([oldParentScene, parentScene]);
    }
    

    /**
     * The Transform of the parent Entity.
     */
    get transform(): Transform {
        return this._parent === null ? null : this._parent.transform;
    }

    constructor(name: string) {
        super(name, true);
    }

    public load(): void {};
    public abstract start(): void;
    public abstract update(): void;
    public render(): void {} // TO BE UNUSED BY SUBCLASSES
}
