import { Shader } from "../../gl/shader/Shader";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3 } from "gl-matrix";
import { Color } from "../Color";
import { Texture } from "../Texture";

export abstract class Material {
    protected _shader: Shader;

    public texture: Texture;
    public color: Color = Color.BLACK;

    public get shader(): Shader {
        return this._shader;
    }
    
    constructor(shaderName: string, texture?: Texture, color?: Color) {
        this._shader = ShaderManager.getInstance().getShader(shaderName);

        this.texture = texture;

        if (color !== undefined) {
            this.color = color;
        }
    }

    public applyStandardUniforms(model: mat3, projection: mat3, view: mat3): void {
        this._shader.use();
        this._shader.applyStandardUniforms(model, projection, view, this.texture, this.color);
    }

    /**
     * This can be used by the Material to apply any additional Shader uniforms.
     */
    public abstract applyAdditionalUniforms(): void;
}
