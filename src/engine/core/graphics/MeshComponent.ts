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

        // MATRIX TESTING (TO BE UPDATED WITH ACTUAL TRANSFORM LATER)
        const transMat: mat3 = mat3.create();
        const rotMat: mat3 = mat3.create();
        const scaleMat: mat3 = mat3.create();

        const outMat: mat3 = mat3.create();

        mat3.fromTranslation(transMat, vec2.fromValues(250, 100));
        mat3.fromRotation(rotMat, degToRadians(25));
        mat3.fromScaling(scaleMat, vec2.fromValues(2, 2));

        mat3.mul(outMat, transMat, rotMat);
        mat3.mul(outMat, outMat, scaleMat);

        this._mesh.render(
            outMat,
            RendererManager.getInstance().currentRenderer.projectionMat
        );
    }
}
