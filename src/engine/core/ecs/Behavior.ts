import { Lifecycle } from "../Lifecycle";
import { Entity } from "./Entity";
import { GameObject } from "./GameObject";

export abstract class Behavior extends GameObject implements Lifecycle {
    public parent: Entity;

    constructor(name: string) {
        super(name, true);
    }

    public load(): void {};
    public abstract start(): void;
    public abstract update(): void;
    public render(): void {} // TO BE UNUSED BY SUBCLASSES
}
