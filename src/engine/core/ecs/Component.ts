import { Lifecycle } from "../Lifecycle";
import { GameObject } from "./GameObject";

export abstract class Component extends GameObject implements Lifecycle {
    constructor(name: string) {
        super(name, true);
    }

    public abstract load(): void;
    public abstract start(): void;
    public abstract update(): void;
    public abstract render(): void;
}
