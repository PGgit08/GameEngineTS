import { Shader } from "../../gl/shader/Shader";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3 } from "gl-matrix";
import { Color } from "../Color";
import { Texture } from "../Texture";
import { GameObject } from "../../ecs/GameObject";
import { Mesh } from "../Mesh";
import { Geometry } from "../geometry/Geometry";
import { ShaderConfig } from "../../config/ShaderConfig";


/**
 * @classdesc
 * The second part making up a {@link Mesh}. This object "paints" a {@link Geometry}. It applies all standard uniforms on the Geometry
 * (model mat, projection mat, view mat, texture, color) and can also apply any additional uniforms on the Geometry. It is meant to be
 * override by any custom Materials.
 * 
 * @class Material
 * @extends GameObject
 * @abstract
 * 
 * @param {string} name - The name of this Material.
 * @param {string} shaderName - The name of the {@link Shader} used by this Material.
 * @param {Texture} [texture] - The Texture used by this Material.
 * @param {Color} [color] - The Color used by this Material (DEFAULT IS BLACK).
 */
export abstract class Material extends GameObject {
    protected _shader: Shader;

    /** The Texture used by this Material @type {Texture} */
    public texture: Texture;
    
    /** The Color used by this Material (DEFAULT IS BLACK) @type {Color} */
    public color: Color = Color.BLACK;

    public get shader(): Shader {
        return this._shader;
    }
    
    constructor(name: string, shaderName: string, texture: Texture, color?: Color) {
        super(name);

        this._shader = ShaderManager.getInstance().getShader(shaderName);

        this.texture = texture;

        if (color !== undefined) {
            this.color = color;
        }
    }

    /**
     * Applies the standard uniforms (described in {@link ShaderConfig}) on the Geometry.
     * 
     * @param {mat3} model - The model matrix.
     * @param {mat3} projection - The projection matrix.
     * @param {mat3} view - The view matrix.
     */
    public applyStandardUniforms(model: mat3, projection: mat3, view: mat3): void {
        this._shader.use();
        this._shader.applyStandardUniforms(model, projection, view, this.texture, this.color);
    }

    /**
     * This can be used by a custom Material to apply any additional Shader uniforms on the Geometry.
     * 
     * @abstract
     */
    public abstract applyAdditionalUniforms(): void;
}
