import { GameObject } from "../ecs/GameObject";
import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";
import { mat3 } from "gl-matrix";

export class Mesh extends GameObject {
    protected _geometry: Geometry;
    protected _material: Material;

    public visible: boolean = true;

    public get width(): number {
        return this._geometry.width;
    }

    public get height(): number {
        return this._geometry.height;
    }
    
    public get geometry(): Geometry {
        return this._geometry;
    }

    public get material(): Material {
        return this._material;
    }

    public set geometry(g: Geometry) {
        this._geometry = g;
    }

    public set material(m: Material) {
        this._material = m;
    }

    constructor(name: string, geometry: Geometry, material: Material, wireframe?: boolean) {
        super(name);

        this._geometry = geometry;
        this._material = material;

        if (wireframe) { this._geometry.enableWireframe(); }
    }

    /**
     * Loads the Mesh, should be called in load() of Lifecycle
     */
    public load(): void {
        this._geometry.load(this._material.shader);
    }

    /**
     * Draws the Mesh
     */
    public draw(model: mat3, projection: mat3, view: mat3): void {
        if (!this.visible) { return; }
        
        this._material.applyStandardUniforms(
            model,
            projection,
            view
        );
        
        this._material.applyAdditionalUniforms();
        
        this._geometry.draw();
    }
}
