import { ColorMaterial } from "@GETS";
import { GLBuffer } from "@gl/GLBuffer";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { Vector2 } from "@physics/Vector";
import { Geometry } from "@graphics/Geometry/Geometry";
import { Material } from "@graphics/Materials/Material";

/**
 * Any Renderable objects (Sprite, Rect2D, Ellipse2D) inherit this abstract class to have the items and properties
 * required (Material, Mesh Buffers, etc.) in order to get Rendered to the screen. Renderables are taken
 * care by a RenderComponent, which can be attached to an entity.
 */
export class Mesh {
    private _geometry: Geometry;
    private _material: Material & any;

    // the buffer received from this Mesh's Geometry
    private _buffer: GLBuffer;

    /**
     * Create a new Mesh, which is a combination of Geometry and Material.
     * @param geometry Geometry for this Mesh.
     * @param material Material for this Mesh.
     */
    constructor(geometry: Geometry, material: Material) {
        this._geometry = geometry;
        this._material = material;

        this._buffer = this._geometry.buffer;
    };

    /**
     * Draw the Mesh.
     * @param model Model Matrix.
     * @param projection Projection Matrix.
     * @param view View Matrix.
     */
    public draw(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void {
        // set the shader uniforms
        this._material.ApplyUniforms(model, projection, view);

        // set the current buffer and draw it
        this._buffer.bind();
        this._buffer.draw();
        this._buffer.unbind();
    };

    public get geometry(): Geometry {
        return this._geometry;
    };

    public get material(): Material & any {
        return this._material;  
    };
};
