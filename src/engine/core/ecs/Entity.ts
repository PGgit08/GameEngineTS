import { vec2 } from "gl-matrix";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";
import { Transform } from "../math/Transform";
import { Component } from "./Component";
import { GameObject } from "./GameObject";
import { Scene } from "./Scene";
import { EventEmmiter } from "../events/EventEmmiter";
import { Event } from "../events/Event";
import { Events } from "../events/Events";
import { Behavior } from "./Behavior";

/**
 * @classdesc
 * A hierarchy GameObject that can have child {@link Component} classes and child {@link Entity} classes. This object can also be a child of
 * another Entity or be a child of a {@link Scene}. This class implements the {@link Lifecycle} interface and its Lifecycle methods are 
 * called whenever its parent Entity's Lifecycle methods are called, or whenever its parent Scene's Lifecycle methods are called. However,
 * its {@link load} method is not only called during the LOAD period, but also when this Entity is added into the heirarchy.
 * 
 * @class Entity
 * @extends GameObject
 * @implements {Lifecycle}
 * 
 * @param {string} name - The name of this Entity.
 * @param {boolean} [relativeChildren] - A boolean that if True makes all of this Entity's children relative to it in {@link Transform} (DEFAULT IS True).
 */
export class Entity extends GameObject implements Lifecycle {
    private _loaded = false;

    private _parent: Entity = null;
    private _children: Entity[] = [];

    private _components: Component[] = [];

    private _parentScene: Scene = null;

    /** This Entity's Transform @type {Transform} */
    public readonly transform: Transform = new Transform(this);

    /** The {@link EventEmmiter} belonging to this Entity. */
    public readonly eventEmmiter: EventEmmiter = new EventEmmiter("ENTITY_EVENT_EMMITER");

    // the events belonging to this entity
    private _PARENT_SCENE_CHANGE_EVENT: Event<Scene[]> = new Event(Events.PARENT_SCENE_CHANGE, this.eventEmmiter);
    private _PARENT_CHANGE_EVENT: Event<Entity[]> = new Event(Events.PARENT_CHANGE, this.eventEmmiter);

    /**
     * A boolean stating whether the children of this Entity are relative to this Entity in Transform.
     * @type {boolean}
     */
    public relativeChildren: boolean;

    /**
     * A boolean stating whether this Entity is a relative child to its parent Entity's in Transform.
     * @type {boolean}
     */
    public relativeChild: boolean = true;

    /** @returns {Component[]} The Components belonging to this Entity. */
    get components(): Component[] {
        return this._components;
    }

    /** @returns {Entity[]} The child Entities belonging to this Entity. */
    get children(): Entity[] {
        return this._children;
    }

    /** @returns {Scene} The Scene this Entity belongs to. */
    get parentScene(): Scene {
        return this._parentScene;
    }

    /**
     * Sets the parentScene of this Entity.
     * !!! SHOULD NEVER BE SET DIRECTLY !!!
     */
    set parentScene(parentScene: Scene) {
        const oldParentScene = this._parentScene;

        this._parentScene = parentScene;
        this._PARENT_SCENE_CHANGE_EVENT.invoke([oldParentScene, parentScene]);

        this._children.forEach((c) => c.parentScene = parentScene);

        this._components.forEach((c) => c.parentScene = parentScene);
    }

    /** @returns {Entity} The parent Entity of this Entity. */
    get parent(): Entity {
        return this._parent;
    }

    /**
     * Sets the parent of this Entity.
     * !!! SHOULD NEVER BE SET DIRECTLY !!!
     */
    set parent(parent: Entity) {
        const oldParent = this._parent;

        this._parent = parent;
        this._PARENT_CHANGE_EVENT.invoke([oldParent, parent]);
    }

    /**
     * A Spawn function that Spawns an Entity TYPE.
     * @static
     * 
     * @param Spawned The Entity TYPE to Spawn.
     * @param position The optional position at which to Spawn the Entity.
     * @param parent The optional parent of this Entity (if none, then Entity is added directly to current Scene).
     * 
     * @returns The Spawned Entity.
     */
    public static Spawn<T extends Entity>(Spawned: new (...args: any[]) => T, position?: vec2, parent?: Entity): T {
        const spawned: T = new Spawned();

        if (position) {
            spawned.transform.position = position;
        }
        
        if (parent) {
            parent.addChildren(spawned);
        } else {
            SceneManager.getInstance().currentScene.addEntities(spawned);
        }

        return spawned;
    }

    /**
     * Despawns a given Entity instance.
     * 
     * @static
     *
     * @param entity The given Entity to despawn.
     */
    public static Despawn(entity: Entity): void {
        if (entity.parent === null) return;

        entity.parent.removeChild(entity);
    }

    constructor(name: string, realtiveChildren: boolean = true) {
        super(name);
        this.relativeChildren = realtiveChildren;
    }


    /**
     * Add children to this Entity
     * 
     * @param children The children to add
     */
    public addChildren(...children: Entity[]): void {
        children.forEach((c) => {
            if (c.parent !== null) {
                c.parent.removeChild(c);
            }

            c.parent = this;
            c.parentScene = this._parentScene;

            if (this._loaded) c.load();
        });

        this._children.push(...children);
    } 

    /**
     * Removes a given Entity child from this Entity.
     * 
     * @param entity The Entity to remove.
     */
    public removeChild(entity: Entity): void {
        entity.parent = null;
        entity.parentScene = null;

        this._children.splice(this._children.indexOf(entity), 1);

        // TODO: Add UNLOAD lifecycle method here
    }

    /**
     * Add Components to this Entity.
     * 
     * @param components The Components to add.
     */
    public addComponents(...components: Component[]): void {
        components.forEach((c) => {
            if (c.parent !== null) {
                throw new Error("Unable to add component as it already has a parent.");
            }

            c.parent = this;
            c.parentScene = this._parentScene;

            if (this._loaded) c.load();
        });

        this._components.push(...components);
    }

    /**
     * Returns a Component by it's type from the Entity.
     * 
     * @param ComponentType The component Type.
     * 
     * @returns {ComponentType} The desired Component.
     */
    public getComponent<T extends Component>(ComponentType: new (...args: any[]) => T): T {
        for (let c of this._components) {
            if (c instanceof ComponentType) {
                return c as T;
            }
        }
        // ConstructorParameters<T>
        return undefined;
    }

    /**
     * Checks the parent Scene of this Entity.
     * 
     * @param sceneName The name of the Scene to check this Entity's parent Scene with.
     * 
     * @returns {boolean} True is the parent Scene's name is sceneName.
     */
    public isParentScene(sceneName: string): boolean {
        if (this._parentScene === null) {
            return false;
        }

        return this._parentScene.name === sceneName;
    }
    
    public load(): void {
        if (this._loaded) return;
        
        this._components.forEach((c) => c.load());
        this._children.forEach((c) => c.load());

        this._loaded = true;
    }

    public update(): void {
        this._components.forEach((c) => { if (c.enabled) c.update(); });

        this._children.forEach((c) => c.update());
    }
    
    public render(): void {
        this._components.forEach((c) => {
            if (c instanceof Behavior) return;
            if (c.enabled) c.render();
        });

        this._children.forEach((c) => c.render());
    }
}
