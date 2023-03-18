import { Color } from "../Color";
import { Material } from "./Material";

export class ColorMaterial extends Material {
    public color: Color;

    /**
     * A basic Color Material that uses Shader2D
     * @param color The Color for this Material (default = Color.WHITE).
     */
    constructor(color: Color = Color.WHITE) {
        super("ColorShader");
        this.color = color;
    }

    public applyAdditionalUniforms(): void {
        this._shader.setUniformVec4('color', this.color.toVec4());
    }
}
