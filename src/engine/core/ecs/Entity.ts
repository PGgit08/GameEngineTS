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

export class Entity extends GameObject implements Lifecycle {
    private _loaded = false;

    private _parent: Entity = null;
    private _children: Entity[] = [];

    private _components: Component[] = [];

    private _parentScene: Scene = null;

    public readonly transform: Transform = new Transform(this);

    public readonly eventEmmiter: EventEmmiter = new EventEmmiter();

    // the events belonging to this entity
    private _PARENT_SCENE_CHANGE_EVENT: Event<Scene[]> = new Event(Events.PARENT_SCENE_CHANGE, this.eventEmmiter);
    private _PARENT_CHANGE_EVENT: Event<Entity[]> = new Event(Events.PARENT_CHANGE, this.eventEmmiter);

    /**
     * A boolean stating whether the children of this Entity are relative to this Entity in Transform.
     * If this is false, all children will not be non-relative to this Entity in Transform.
     * If this is true, children will be relative to this Entity in Transform, except if they are have their
     * "relativeChild" property as false and choose to be independent to this Entity.
     */
    public relativeChildren: boolean;
    public relativeChild: boolean = true;

    get components(): Component[] {
        return this._components;
    }

    get children(): Entity[] {
        return this._children;
    }

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
     * A Spawn function that Spawns an Entity TYPE, and loads it.
     * @param Spawned The Entity TYPE to Spawn.
     * @param position The optional position at which to Spawn the Entity.
     * @param parent The optional parent of this Entity (if none, then Entity is added directly to current Scene).
     * @returns The Spawned Entity.
     */
    public static Spawn<T extends Entity>(Spawned: new () => T, position?: vec2, parent?: Entity): T {
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
     * Despawns a given Entity instance (TO BE CHANGED TO DESPAWN BY NAME LATER).
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
     * @param components The Components to add.
     */
    public addComponents(...components: Component[]): void {
        components.forEach((c) => {
            if (c.parent !== null) {
                c.parent.removeComponent(c);
            }

            c.parent = this;
            c.parentScene = this._parentScene;

            if (this._loaded) c.load();
        });

        this._components.push(...components);
    }

    /**
     * Remove Component from this Entity.
     * @param component The Component to remove.
     */

    // TODO: Remove this?
    public removeComponent(component: Component): void {
        component.parent = null;
        component.parentScene = null;

        this._components.splice(this._components.indexOf(component), 1);
    }


    /**
     * Returns a Component by it's type from the Entity.
     * @param ComponentType The component Type.
     * @returns The desired Component.
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
