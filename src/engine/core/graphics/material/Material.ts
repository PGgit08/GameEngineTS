import { RendererManager } from "../../managers/RendererManager";
import { Shader } from "../../gl/shader/Shader";
import { ShaderManager } from "../../managers/ShaderManager";

export class Material {
    private _shader: Shader;
    
    constructor(shaderName: string) {
        this._shader = ShaderManager.getInstance().getShader(shaderName);
    }

    public applyStandarUniforms(): void {
        this._shader.use();
        this._shader.applyStandardUniforms(RendererManager.getInstance().currentRenderer.projectionMat);
    }
}
