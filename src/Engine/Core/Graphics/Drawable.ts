import { GLBuffer } from "@gl/GLBuffer";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { Vector2 } from "@physics/Vector";
import { Material } from "./Material";

/**
 * Low-Level abstract class, that items which get drawn to the screen can inherit.
 * @example Sprite   
 */
export abstract class Drawable{
    // the anchor point for a drawable, used for rotation and tranformations(defaults to half)
    public origin: Vector2 = new Vector2(0.5, 0.5);

    // the center point of the shape pre-transformation(defaults to 0,0 since origin default)
    public center: Vector2 = Vector2.origin;

    // the width and height of this Drawable
    protected _width: number = 100;
    protected _height: number = 100;

    // the Material that associates with this drawable
    protected _material: Material = Material.FromConfig();

    // the mesh(vertex buffer) that associates with this drawable
    protected _mesh: GLBuffer = new GLBuffer();

    // the min/max X calculated with origin and width(can be useful for AABB)
    protected _minX: number = -(this._width * this.origin.x);
    protected _maxX: number = this._width * this.origin.y;
    
    // the min/max Y calculated with origin and height(can be useful for AABB)
    protected _minY: number = -(this._height * this.origin.y);
    protected _maxY: number = this._height * this.origin.y;

    /**
     * Sets the verticies in the mesh and uploads it to the GPU. (done during loading-process)
     * Sub-classes should override. (example: Rect2D, load verticies based on height and width)
     */
    public abstract loadMesh(): void;

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

    private _setUniforms(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void{
        this._material.ApplyStandardUniforms(model, projection, view);
    
    };  

    private _drawMesh(): void{
        this._mesh.bind();
        this._mesh.draw();
    };

    /**
     * A draw method to preform tranforming and rendering.
     * @param pos The position to the transforming/rendering.
     */
    public draw(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void{
        this._setUniforms(model, projection, view);
        this._drawMesh();
    };

    public get mesh(): GLBuffer{
        return this._mesh;
    };

    public get material(): Material{
        return this._material;
    };
};