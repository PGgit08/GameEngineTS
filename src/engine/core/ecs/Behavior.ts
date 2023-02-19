import { Lifecycle } from "../Lifecycle";
import { GameObject } from "./GameObject";

export class Behavior extends GameObject implements Lifecycle {
    constructor() {
        super();
    }

    public start(): void {}
    public update(): void {}
    public render(): void {}
}
