import { Component } from "../ecs/Component";
import { RendererManager } from "../managers/RendererManager";
import { Mesh } from "./Mesh";
import { Sprite } from "./Sprite";

export class MeshComponent extends Component {
    private _mesh: Mesh & Sprite; // IDK IF THIS IS A GOOD IDEA

    public get mesh(): Mesh & Sprite {
        return this._mesh;
    }

    constructor(mesh: Mesh & Sprite) {
        super("MeshComponent");

        this._mesh = mesh;
    }

    public load(): void {
        this._mesh.load();
    }

    public start(): void {}
    public update(): void {}

    public render(): void {
        // console.log("MESH COMPONENT RENDER");
        this._mesh.render(
            this.parent.worldMatrix,
            RendererManager.getInstance().currentRenderer.projectionMat
        );
    }
}
