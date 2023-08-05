import { GameObject } from "../ecs/GameObject";
import { Geometry } from "./geometry/Geometry";
import { Material } from "./material/Material";
import { mat3 } from "gl-matrix";
import { Component } from "../ecs/Component";

/**
 * @classdesc
 * A GameObject that is used for rendering. It stores a {@link Geometry} object and a {@link Material} object. When
 * drawn it draws its Geometry and then "paints" over it with its Material.
 * 
 * @class Mesh
 * @extends GameObject
 * 
 * @param {string} name - The name of this Mesh.
 * @param {Geometry} geometry - The Geometry belonging to this Mesh.
 * @param {Material} material - The Material belonging to this Mesh.
 */
export class Mesh extends GameObject {
    protected _geometry: Geometry;
    protected _material: Material;

    /** The visibility of this Mesh. @type {boolean} */
    public visible: boolean = true;

    /** @returns {number} The width of this Mesh's Geometry. */
    public get width(): number {
        return this._geometry.width;
    }

    /** @returns {number} The height of this Mesh's Geometry. */
    public get height(): number {
        return this._geometry.height;
    }
    
    /** @returns {Geometry} The Geometry belonging to this Mesh. */
    public get geometry(): Geometry {
        return this._geometry;
    }

    /** @returns {Material} The Material belonging to this Mesh. */
    public get material(): Material {
        return this._material;
    }

    constructor(name: string, geometry: Geometry, material: Material) {
        super(name);

        this._geometry = geometry;
        this._material = material;
    }

    /**
     * Loads this Mesh, should be called ONCE in during the load() methods of its parent {@link Component}.
     */
    public load(): void {
        this._geometry.load(this._material.shader);
    }

    /** Unloads this Mesh. */
    public unload(): void {
        this._geometry.unload();
    }

    /**
     * Draws this Mesh by first drawing the Geometry and "painting" over it with the Material.
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
