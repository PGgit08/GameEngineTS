import { GLMatrix4 } from "@gl/GLMatrix4";
import { GLShader } from "@gl/GLShader";
import { ShaderManager } from "@gl/ShaderManager";
import { Color } from "@graphics/Color";

/**
 * The material that is linked to a drawable.
 * Contains Color, Texture, and etc. for a drawable.
 * Also applies shader transformations and sets uniforms.
 */
export class Material{
    // the tint of this material(color)
    public tint: Color;

    // the shader that assosiates to this Material/Drawable.
    public shader: GLShader;

    /**
     * Creates new Material.
     * @param shader The shader that associates to this Material.
     * @param tint The tint that associates to this Material.
     */
    constructor(shader: GLShader, tint: Color){
        this.shader = shader;
        this.tint = tint;
    };

    /**
     * Creates a new Material from config.
     * @param shaderName The name of the shader to be used(default: Shader2D).
     * @param tint The tint that associates to this Material(default: Color.white).
     */
    public static FromConfig(shaderName: string = 'Shader2D', tint: Color = Color.white): Material{
        return new Material(ShaderManager.GetShader(shaderName), tint);
    };

    /**
     * Apply standard uniforms to this Material's shader.
     * @param model The model matrix.
     * @param projection The projection matrix.
     * @param view The view matrix.
     */
    public ApplyStandardUniforms(model: GLMatrix4, projection: GLMatrix4, view: GLMatrix4): void{
        this.shader.ApplyStandardUniforms(this, model, projection, view);
    };
};