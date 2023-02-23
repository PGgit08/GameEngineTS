import { mat3, vec2 } from "gl-matrix";
import { degToRadians } from "../math/Utils";
import { Component } from "../ecs/Component";
import { RendererManager } from "../managers/RendererManager";
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

        this._mesh.render(
            this.parent.worldMatrix,
            RendererManager.getInstance().currentRenderer.projectionMat
        );
    }
}
