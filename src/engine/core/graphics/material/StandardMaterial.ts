import { Color } from "../Color";
import { Texture } from "../Texture";
import { Material } from "./Material";

export class StandardMaterial extends Material {
    public texture: Texture;
    public color: Color = Color.WHITE;

    // A StandardMaterial that uses Textures and Colors and the Shader2D shader.
    constructor(texture?: Texture, color?: Color) {
        super("Shader2D");

        this.texture = texture;

        if (color !== undefined) {
            this.color = color;
        }
    }

    public applyAdditionalUniforms(): void {
        if (this.texture !== undefined && this.texture.texture !== undefined) {
            this.texture.activateAndBind();
        } else {
            // if no texture supplied, set the uniform to undefined
            gl.activeTexture(0);
            gl.bindTexture(gl.TEXTURE_2D, undefined);
        }

        this._shader.setUniformInt('u_texture', 0);

        if (this.color !== undefined) {
            this._shader.setUniformVec4('u_color', this.color.toVec4());
        }
    }
}
