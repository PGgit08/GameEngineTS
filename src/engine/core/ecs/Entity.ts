import { mat3 } from "gl-matrix";
import { Lifecycle } from "../Lifecycle";
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

    private _worldMatrix: mat3;

    get worldMatrix(): mat3 {
        return this._worldMatrix;
    }

    constructor(name: string) {
        super(name);
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
        this._worldMatrix = this.transform.toMatrix();

        this._components.forEach((c) => c.render());

        this._children.forEach((c) => c.render());
    }
}
