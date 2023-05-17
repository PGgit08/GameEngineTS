import { Shader } from "../../gl/shader/Shader";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3 } from "gl-matrix";

export abstract class Material {
    protected _shader: Shader;

    public get shader(): Shader {
        return this._shader;
    }
    
    constructor(shaderName: string) {
        this._shader = ShaderManager.getInstance().getShader(shaderName);
    }

    public applyStandardUniforms(model: mat3, projection: mat3, view: mat3): void {
        this._shader.use();
        this._shader.applyStandardUniforms(model, projection, view);
    }

    /**
     * This can be used by the Material to apply any additional Shader uniforms.
     */
    public abstract applyAdditionalUniforms(): void;
}
