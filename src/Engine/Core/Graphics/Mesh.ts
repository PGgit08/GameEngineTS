import { GLBuffer } from "@gl/GLBuffer";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { Vector2 } from "@physics/Vector";
import { Material } from "./Materials/Material";

/**
 * Any Renderable objects (Sprite, Rect2D, Circle2D) inherit this abstract class to have the items and properties
 * required (Material, Mesh Buffers, etc.) in order to get Rendered to the screen. Renderables are taken
 * care by a RenderComponent, which can be attached to an entity.
 */
export abstract class Mesh{
    // the anchor point for a drawable, used for rotation and tranformations(defaults to half)
    public origin: Vector2 = new Vector2(0.5, 0.5);

    // the center point of the shape pre-transformation(defaults to 0,0 since origin default)
    public center: Vector2 = Vector2.origin;

    // the width and height of this Drawable
    protected _width: number;
    protected _height: number;

    // the Material that associates with this mesh(material setup will be different later with manager)
    protected _material: Material = Material.FromConfig();

    // the geometry(vertex buffer) that associates with this mesh
    protected _geometry: GLBuffer = new GLBuffer();

    // the min/max X calculated with origin and width(can be useful for AABB)
    protected _minX: number;
    protected _maxX: number;
    
    // the min/max Y calculated with origin and height(can be useful for AABB)
    protected _minY: number;
    protected _maxY: number;

    /**
     * Create a new Mesh.
     * @param width The width of this Mesh (default: 100).
     * @param height The height of this Mesh (default: 100).
     */
    constructor(width: number = 100, height: number = 100){
        this._width = width;
        this._height = height;

        this.calcBox();
    };

    /**
     * Sets the verticies in the mesh and uploads it to the GPU. (done during loading-process)
     * Sub-classes should override. (example: Rect2D, load verticies based on height and width)
     */
    public abstract loadGeometry(): void;

    /**
     * Find min/max X/Y as well as center vector and make box dimensions out of it
     */
    protected calcBox(): void{
        
        this._minX = -(this._width * this.origin.x);
        this._maxX = this._width * (1.0 - this.origin.x);
        
        this._minY = -(this._height * this.origin.y);
        this._maxY = this._height * (1.0 - this.origin.y);
        
        // make sure to also get center
        this.center.x = this._minX + (this._width * this.origin.x);   
        this.center.y = this._minY + (this._height * this.origin.y);
    };

    /**
     * A draw method to preform tranforming and rendering.
     * @param pos The position to the transforming/rendering.
     */
    public draw(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void{
        // set the shader uniforms(matricies, color vectors)
        this._material.ApplyUniforms(model, projection, view);
        
        // set the current vertex buffer to this geometry, and draw the buffer
        this._geometry.bind();
        this._geometry.draw();
    };

    public get geometry(): GLBuffer{
        return this._geometry;
    };

    public get material(): Material{
        return this._material;
    };
};