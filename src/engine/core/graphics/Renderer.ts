import { GameObject } from "../ecs/GameObject";
import { Lifecycle } from "../Lifecycle";

export class Renderer extends GameObject implements Lifecycle {
    constructor(name: string) {
        super(name, true);
    }

    public start(): void {
        console.log("Renderer Start");
    }

    public update(): void {
        console.log("Renderer Update");
    }

    public render(): void {
        console.log("Renderer Render");
    }
}
