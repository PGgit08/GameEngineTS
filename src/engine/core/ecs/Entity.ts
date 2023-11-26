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

    /** The {@link EventEmmiter} belonging to this Entity. @type {EventEmmiter} */
    public readonly eventEmmiter: EventEmmiter = new EventEmmiter("ENTITY_EVENT_EMMITER");

    /** Whether this Entity is enabled or not, if it's not, it won't be updated / rendered. @type {boolean} */
    public enabled: boolean = true;

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
     * !!! **SHOULD NEVER BE SET DIRECTLY** !!!
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
     * !!! **SHOULD NEVER BE SET DIRECTLY** !!!
     */
    set parent(parent: Entity) {
        const oldParent = this._parent;

        this._parent = parent;
        this._PARENT_CHANGE_EVENT.invoke([oldParent, parent]);
    }

    /**
     * A Spawn function that Spawns an Entity TYPE.
     * 
     * @static
     * 
     * @param {Entity} Spawned - The Entity TYPE to Spawn.
     * @param {vec2} [position] - The optional position at which to Spawn the Entity.
     * @param {Entity} [parent] - The optional parent of this Entity (if none, then Entity is added directly to current Scene).
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
     * Despawns a given Entity instance by removing it from its parent.
     * 
     * @static
     *
     * @param {Entity} entity - The given Entity to despawn.
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
     * Returns child(ren) of this Entity by its name if it is found.
     * 
     * 
     * @param {string} name - The name of the child. 
     * @param {boolean} [all] - If this boolean is true, then the Entity will additionally look through 
     * its children and their children as well and so on to find the desired Entity (DEFAULT IS False).
     * 
     * @returns {Entity[]} The desired child(ren).
     */
    public getChildByName(name: string, all: boolean = false): Entity[] {
        const matchingChildren: Entity[] = [];

        this._children.forEach((c) => {
            if (c.name === name) matchingChildren.push(c);
            else if (all) matchingChildren.push(...c.getChildByName(name, all));
        });

        return matchingChildren;
    }

    /**
     * Returns a child of this Entity by its id if it is found.
     * 
     * @param {string} id - The id of the child.
     * @param {boolean} [all] - If this boolean is true, then the Entity will additionally look through 
     * its children and their children as well and so on to find the desired Entity (DEFAULT IS False).
     * 
     * @returns {Entity} The desired child.
     */
    public getChildById(id: string, all: boolean = false): Entity {
        let matchingChild: Entity = null;

        this._children.forEach((c) => {
            if (c.id === id) matchingChild = c;
            else if (all) matchingChild = c.getChildById(id, all);
        });

        return matchingChild;
    }


    /**
     * Add children to this Entity
     * 
     * @param {Entity[]} children - The children to add
     */
    public addChildren(...children: Entity[]): void {
        children.forEach((c) => {
            if (this.getChildById(c.id) !== null) { return; }

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
     * @param {Entity} entity - The Entity to remove.
     */
    public removeChild(entity: Entity): void {
        if (this.getChildById(entity.id) === null) return;

        entity.parent = null;
        entity.parentScene = null;
        
        this.children[this._children.indexOf(entity)].unload();

        this._children.splice(this._children.indexOf(entity), 1);
    }

    /**
     * Add Components to this Entity.
     * 
     * @param {Component[]} components - The Components to add.
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
     * @template {Component} T
     * 
     * @param { {new (...args: any[]): T} } ComponentType - The Component type.
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
     * @param {string} sceneName - The name of the Scene to check this Entity's parent Scene with.
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
        if (!this.enabled) return;

        this._components.forEach((c) => { if (c instanceof Behavior && c.enabled) c.update(); });

        this._children.forEach((c) => c.update());
    }
    
    public render(): void {
        if (!this.enabled) return;

        this._components.forEach((c) => {
            if (c instanceof Behavior) return;
            c.render();
        });

        this._children.forEach((c) => c.render());
    }

    public unload(): void {
        if (!this._loaded) return;

        this._components.forEach((c) => c.unload());
        this._children.forEach((c) => c.unload());

        this._loaded = false;
    }
}
