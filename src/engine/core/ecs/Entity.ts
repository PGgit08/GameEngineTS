import { Lifecycle } from "../Lifecycle";
import { GameObject } from "./GameObject";

export class Entity extends GameObject implements Lifecycle {
    constructor() {
        super();
    }

    public start(): void {}
    public update(): void {}
    public render(): void {}
}
