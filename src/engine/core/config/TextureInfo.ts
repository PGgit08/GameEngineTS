import { TexturePackerConfig } from "./TexturePackerConfig";

/**
 * Basic info about a Texture for an EngineConfig.
 * @property {string} name - The name for this Texture.
 * @property {string} fileName - The file name (path) for this Texture.
 * @property {any} configJson - The JSON containing the Texture packing config of this Texture
 * (IF NOTHING SUPPLIED, DEFAULT FRAME TAKING UP WHOLE TEXTURE IS CREATED AND USED).
 */
export interface TextureInfo {
    name: string;
    fileName?: string;
    configJson?: TexturePackerConfig;
}
