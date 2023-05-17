import { ShaderConfig } from "../../../GETS";
import { Color } from "../Color";
import { Texture } from "../Texture";
import { Material } from "./Material";

/**
 * A Standard Material for all Shaders.
 * Any Custom Material should extend from this Material.
 */
export class StandardMaterial extends Material {
    public texture: Texture;
    public color: Color = Color.BLACK;

    constructor(texture?: Texture, color?: Color) {
        super("Shader2D");

        this.texture = texture;

        if (color !== undefined) {
            this.color = color;
        }
    }

    public override applyAdditionalUniforms(): void {
        this.texture.activateAndBind();
        this._shader.setUniformVec4(ShaderConfig.UNIFORM_NAMES.COLOR, this.color.toVec4());
    }
}
