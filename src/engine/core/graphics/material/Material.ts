import { Shader } from "../../gl/shader/Shader";
import { ShaderManager } from "../../managers/ShaderManager";
import { mat3 } from "gl-matrix";

export class Material {
    private _shader: Shader;
    
    constructor(shaderName: string) {
        this._shader = ShaderManager.getInstance().getShader(shaderName);
    }

    public applyStandardUniforms(model: mat3, projection: mat3): void {
        this._shader.use();
        this._shader.applyStandardUniforms(model, projection);
    }
}
