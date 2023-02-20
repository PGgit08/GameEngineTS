import { Component } from "../ecs/Component";
import { Mesh } from "./Mesh";

export class MeshComponent extends Component {
    private _mesh: Mesh;

    constructor(mesh: Mesh) {
        super("MeshComponent");

        this._mesh = mesh;
    }

    public load(): void {
        this._mesh.load();
    }

    public start(): void {}
    public update(): void {}

    public render(): void {
        console.log("MESH COMPONENT RENDER");
        this._mesh.draw();
    }
}