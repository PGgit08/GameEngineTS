import { Texture } from "../Texture";
import { Material } from "./Material";

export class TextureMaterial extends Material {
    public texture: Texture;

    constructor(texture: Texture) {
        super('TextureShader');
        this.texture = texture;
    }

    public applyAdditionalUniforms(): void {
        this.texture.activateAndBind();
        this._shader.setUniformInt('texture', this.texture.unit);
        this.texture.unbind();
    }
}