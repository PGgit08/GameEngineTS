import { Lifecycle } from "../Lifecycle";
import { GameObject } from "./GameObject";

export class Entity extends GameObject implements Lifecycle {
    public parent: Entity;
    private _children: Entity[] = [];

    constructor(name: string) {
        super(name);
    }

    /**
     * Add children to this Entity
     */
    public addChildren(...children: Entity[]): void {
        this._children.push(...children);
        children.forEach((c) => c.parent = this);
    } 

    public start(): void {
        this._children.forEach((c) => c.start());
    }

    public update(): void {
        this._children.forEach((c) => c.update());
    }
    
    public render(): void {
        this._children.forEach((c) => c.render());
    }
}
