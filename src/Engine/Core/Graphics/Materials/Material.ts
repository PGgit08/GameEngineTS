import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { ShaderManager } from "@graphics/ShaderManager";


/**
 * The material that is linked to a drawable.
 * Contains Color, Texture, and etc. for a drawable.
 * Also applies shader transformations and sets uniforms.
 */
export class Material {
    // the name of this Material
    protected _name: string;

    // the shader that assosiates to this Material/Drawable.
    protected _shader: GLShader;

    /**
     * Apply standard uniforms to this Material's shader.
     * @param model The model matrix.
     * @param projection The projection matrix.
     * @param view The view matrix.
     */
    public ApplyUniforms(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void {
        this._shader.ApplyUniforms(this, model, projection, view);
    };

    public get shader(): GLShader {
        return this._shader;
    };

    public get name(): string {
        return this._name;
    };
};