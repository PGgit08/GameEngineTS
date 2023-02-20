import { Component } from "../ecs/Component";

export class MeshComponent extends Component {
    constructor() {
        super("MeshComponent");
    }

    public load(): void {}
    public start(): void {}
    public update(): void {}

    public render(): void {
        console.log("MESH COMPONENT RENDER");
    }
}