import { Color } from "../Color";
import { Texture } from "../Texture";
import { Material } from "./Material";

export class StandardMaterial extends Material {
    public texture: Texture;
    public color: Color;

    // A StandardMaterial that uses Textures and Colors and the Shader2D shader.
    constructor(texture?: Texture, color?: Color) {
        super("Shader2D");

        this.texture = texture;
        this.color = color;
    }

    public applyAdditionalUniforms(): void {
        if (this.texture !== undefined && this.texture.texture !== undefined) {
            this.texture.activateAndBind();
            this._shader.setUniformInt('u_texture', 0);
            // this.texture.unbind(); // BREAKS EVERYTHING
        }

        if (this.color !== undefined) {
            this._shader.setUniformVec4('u_color', this.color.toVec4());
        }
    }
}
