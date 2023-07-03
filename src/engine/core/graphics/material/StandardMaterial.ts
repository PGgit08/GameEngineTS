import { Color } from "../Color";
import { Texture } from "../Texture";
import { Material } from "./Material";

/**
 * Represents a Standard Material with ONLY the required attribs/uniforms.
 * This Material uses the built-in Standard Shader. 
 */
export class StandardMaterial extends Material {
    constructor(texture?: Texture, color?: Color) {
        super("StandardMaterial", "StandardShader", texture, color);
    }

    public applyAdditionalUniforms(): void {}
}
