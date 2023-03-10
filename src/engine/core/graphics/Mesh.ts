import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";
import { mat3 } from "gl-matrix";

export class Mesh {
    public geometry: Geometry;
    public material: Material;

    constructor(geometry: Geometry, material: Material, wireframe?: boolean) {
        this.geometry = geometry;
        this.material = material;

        if (wireframe) { this.geometry.enableWireframe(); }
    }

    /**
     * Loads the Mesh, should be called in load() of Lifecycle
     */
    public load(): void {
        this.geometry.load();
    }

    /**
     * Renders the Mesh
     */
    public render(model: mat3, projection: mat3): void {
        this.material.applyStandardUniforms(
            model,
            projection
        );
        this.material.applyAdditionalUniforms();
        
        this.geometry.draw();
    }
}
