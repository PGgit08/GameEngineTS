import { mat3 } from "gl-matrix";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";
import { Transform } from "../math/Transform";
import { Behavior } from "./Behavior";
import { Component } from "./Component";
import { GameObject } from "./GameObject";

export class Entity extends GameObject implements Lifecycle {
    private _loaded = false;

    public parent: Entity = null;
    private _children: Entity[] = [];

    private _components: Component[] = [];
    private _behaviors: Behavior[] = [];

    public transform: Transform = new Transform();

    /** The Matrix of the Entity in world-space. */
    private _worldMatrix: mat3 = mat3.create();

    /** The Matrix of the Entity relative to its parent Entity. */
    private _localMatrix: mat3 = mat3.create();

    private _relativeChildren: boolean;

    get behaviors(): Behavior[] {
        return this._behaviors;
    }

    get components(): Component[] {
        return this._components;
    }

    get children(): Entity[] {
        return this._children;
    }

    /** The Matrix of the Entity in screen-space. */
    get worldMatrix(): mat3 {
        return this._worldMatrix;
    }

    /** The Matrix of the Entity relative to its parent Entity. */
    get localMatrix(): mat3 {
        return this._localMatrix;
    }

    /** States whether the children of this Entity are relative in Transform to this Entity */
    get relativeChildren(): boolean {
        return this._relativeChildren;
    }


    /**
     * A test Spawn function that Spawns an Entity TYPE, and loads it.
     * @param Spawned The Entity TYPE to Spawn.
     * @param transform The optional Transform at which to Spawn the Entity.
     * @param parent The optional parent of this Entity (if none, then Entity is added directly to current Scene).
     * @returns The Spawned Entity.
     */
    public static Spawn<T extends Entity>(Spawned: new () => T, transform?: Transform, parent?: Entity): T {
        const spawned: T = new Spawned();

        if (transform) {
            spawned.transform = transform;
        }
        
        if (parent) {
            parent.addChildren(spawned);
        } else {
            SceneManager.getInstance().currentScene.addEntities(spawned);
        }

        spawned.load();

        return spawned;
    }

    /**
     * (DO NOT USE YET, BEING DEVELOPED). Clones and Spawns an Entity.
     * @param entity The Entity to Clone and Spawn.
     * @param transform The Transform at which to Spawn the Entity (default = Transform()).
     * @param parent The optional parent of this Entity (if none, then Entity is added directly to current Scene).
     * @param load Load Entity during Spawn? (default = true).
     * @returns The cloned Entity.
     */
    public static OldSpawn(entity: Entity, transform: Transform = new Transform(), parent?: Entity, load: boolean = true): Entity {
        const clone: Entity = this.OldClone(entity);

        clone.transform = transform;

        if (parent) {
            clone.parent = parent;
        }

        if (!parent) {
            SceneManager.getInstance().currentScene.addEntities(clone);
        }

        if (load) {
            clone.load();
        }

        return clone;
    }

    /**
     * (DO NOT USE YET, BEING DEVELOPED). Returns the clone of an Entity. 
     * This clone isn't attached to any Scenes or parent Entities. 
     * The clone also doesn't have a Transform.
     * @param entity The entity to clone.
     */
    public static OldClone(entity: Entity): Entity {
        return entity.clone();
    }

    constructor(name: string, realtiveChildren: boolean = true) {
        super(name);
        this._relativeChildren = realtiveChildren;
    }

    /**
     * Add children to this Entity
     * @param children The children to add
     */
    public addChildren(...children: Entity[]): void {
        children.forEach((c) => c.parent = this);
        this._children.push(...children);
    } 

    /**
     * Add components to this Entity
     * @param components The components to add
     */
    public addComponents(...components: Component[]): void {
        components.forEach((c) => c.parent = this);
        this._components.push(...components);
    }

    /**
     * Add behaviors to this Entity
     * @param behaviors The behaviors to add
     */
    public addBehaviors(...behaviors: Behavior[]): void {
        behaviors.forEach((b) => b.parent = this);
        this._behaviors.push(...behaviors);
    }

    /**
     * Returns a Component by it's type from the Entity.
     * @param ComponentType The component Type.
     * @returns The desired Component.
     */
    public getComponent<T extends Component>(ComponentType: new () => T): T {
        for (let c of this._components) {
            if (c instanceof ComponentType) {
                return c;
            }
        }

        return undefined;
    }

    /**
     * Returns a Behavior by it's type from the Entity.
     * @param BehaviorType The behavior Type.
     * @returns The desired Behavior.
     */
    public getBehavior<T extends Behavior>(BehaviorType: new () => T): T {
        for (let b of this._behaviors) {
            if (b instanceof BehaviorType) {
                return b;
            }
        }

        return undefined;
    }

    
    /**
     * TESTING (DONT USE)
     */
    public clone(): Entity {
        const clonedEntity = new Entity(this.name + " (Clone)", this._relativeChildren);

        const clonedBehaviors: Behavior[] = [];
        const clonedComponents: Component[] = [];
        const clonedChildren: Entity[] = [];

        this._behaviors.forEach((b) => clonedBehaviors.push(b.clone() as Behavior));
        this._components.forEach((c) => clonedComponents.push(c.clone() as Component));
        this._children.forEach((c) => clonedChildren.push(c.clone() as Entity));

        clonedEntity.addBehaviors(...clonedBehaviors);
        clonedEntity.addComponents(...clonedComponents);
        clonedEntity.addChildren(...clonedChildren);

        return clonedEntity;
    }

    public load(): void {
        if (!this._loaded) {
            this._components.forEach((c) => c.load());
            this._behaviors.forEach((b) => b.load());

            this._children.forEach((c) => c.load());

            this._loaded = true;
        }
    }

    public start(): void {
        this._components.forEach((c) => c.start());
        this._behaviors.forEach((b) => b.start());

        this._children.forEach((c) => c.start());
    }

    public update(): void {
        this._components.forEach((c) => c.update());
        this._behaviors.forEach((b) => b.update());

        this._children.forEach((c) => c.update());
    }
    
    public render(): void {
        this._localMatrix = this.transform.toMatrix();

        // if this Entity has a parent and the parent wants it's children to be 
        // relative to it, then multiply the entity by its parent's world matrix
        // after multiplying it by its own local matrix 
        if (this.parent && this.parent.relativeChildren) {
            mat3.mul(
                this._worldMatrix,
                this.parent.worldMatrix,
                this._localMatrix
            );
        }

        else {
            this._worldMatrix = this._localMatrix;
        }

        this._components.forEach((c) => c.render());

        this._children.forEach((c) => c.render());
    }
}
