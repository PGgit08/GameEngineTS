import { Lifecycle } from "../Lifecycle";
import { GameObject } from "./GameObject";

export class Entity extends GameObject implements Lifecycle {
    constructor(name: string) {
        super(name);
    }

    public start(): void {}
    public update(): void {}
    public render(): void {}
}
