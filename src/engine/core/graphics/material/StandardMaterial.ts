import { TextureManager } from "../../managers/TextureManager";
import { Color } from "../Color";
import { Texture } from "../Texture";
import { Material } from "./Material";

export class StandardMaterial extends Material {
    public texture: Texture;
    public color: Color = Color.BLACK;

    // A StandardMaterial that uses Textures and Colors and the Shader2D shader.
    constructor(texture?: Texture, color?: Color) {
        super("Shader2D");

        this.texture = texture;

        if (color !== undefined) {
            this.color = color;
        }
    }

    public override applyAdditionalUniforms(): void {
        this.texture.activateAndBind();
        this._shader.setUniformVec4('u_color', this.color.toVec4());
    }
}
