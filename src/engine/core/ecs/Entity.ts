import { mat3 } from "gl-matrix";
import { Triangle } from "../graphics/geometry/Triangle";
import { ColorMaterial } from "../graphics/material/ColorMaterial";
import { Mesh } from "../graphics/Mesh";
import { MeshComponent } from "../graphics/MeshComponent";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";
import { Transform } from "../math/Transform";
import { Behavior } from "./Behavior";
import { Component } from "./Component";
import { GameObject } from "./GameObject";

export class Entity extends GameObject implements Lifecycle {
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
     * Clones and Spawns an Entity.
     * @param entity The Entity to Clone and Spawn.
     * @param transform The Transform at which to Spawn the Entity (default = Transform()).
     * @param parent The optional parent of this Entity (if none, then Entity is added directly to current Scene).
     * @param load Load Entity during Spawn? (default = true).
     * @returns The cloned Entity.
     */
    public static Spawn(entity: Entity, transform: Transform = new Transform(), parent?: Entity, load: boolean = true): Entity {
        const clone: Entity = this.Clone(entity);

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
     * Returns the clone of an Entity. This clone isn't attached to any Scenes or parent Entities. 
     * The clone also doesn't have a transform.
     * @param entity The entity to clone.
     */
    public static Clone(entity: Entity): Entity {
        const clone: Entity = new Entity(entity.name + " (Clone)", entity._relativeChildren);

        clone.addBehaviors(...entity._behaviors);
        clone.addComponents(...entity._components);
        clone.addChildren(...entity._children);

        return clone;
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
        this._children.push(...children);
        children.forEach((c) => c.parent = this);
    } 

    /**
     * Add components to this Entity
     * @param components The components to add
     */
    public addComponents(...components: Component[]): void {
        this._components.push(...components);
        components.forEach((c) => c.parent = this);
    }

    /**
     * Add behaviors to this Entity
     * @param behaviors The behaviors to add
     */
    public addBehaviors(...behaviors: Behavior[]): void {
        this._behaviors.push(...behaviors);
        behaviors.forEach((b) => b.parent = this);
    }


    public load(): void {
        this._components.forEach((c) => c.load());
        // this._behaviors.forEach((b) => b.load());

        this._children.forEach((c) => c.load());
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
