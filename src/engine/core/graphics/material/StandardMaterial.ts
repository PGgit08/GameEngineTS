import { Color } from "../Color";
import { Texture } from "../Texture";
import { Material } from "./Material";

import { ShaderConfig } from "../../config/ShaderConfig";
import { StandardShader } from "../../gl/shader/StandardShader";

/**
 * @classdesc
 * Represents a Standard Material with ONLY the required attribs/uniforms described in {@link ShaderConfig}.
 * This Material uses the built-in {@link StandardShader}.
 * 
 * @class StandardMaterial
 * @extends Material
 * 
 * @param {Texture} [texture] - The Texture of this Material (DEFAULT IS WHITE).
 * @param {Color} [color] - The Color of this Material (DEFAULT IS BLACK).
 */
export class StandardMaterial extends Material {
    constructor(texture?: Texture, color?: Color) {
        super("StandardMaterial", "StandardShader", texture, color);
    }

    public applyAdditionalUniforms(): void {} // empty, nothing custom created
}
