import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";

export class Mesh {
    private _geometry: Geometry;
    private _material: Material;

    constructor(geometry: Geometry, material: Material, wireframe?: boolean) {
        this._geometry = geometry;
        this._material = material;

        if (wireframe) { this._geometry.enableWireframe(); }
    }

    /**
     * Loads the Mesh, should be called in load() of Lifecycle
     */
    public load(): void {
        this._geometry.load();
    }

    /**
     * Renders the Mesh
     */
    public draw(): void {
        this._material.applyStandarUniforms();
        this._geometry.draw();
    }
}