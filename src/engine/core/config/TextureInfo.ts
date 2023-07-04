import { TexturePackerConfig } from "./TexturePackerConfig";

/**
 * Info about a Texture for an EngineConfig.
 */
export interface TextureInfo {
    /** The name for this Texture. @type {string} */
    name: string;

    /** The file name for this Texture (IF NOTHING SUPPLIED, WHITE TEXTURE IS USED). @type {string} */
    fileName?: string;

    /** The TexturePacker JSON containing the TexturePacker info of this Texture
     * (IF NOTHING IS SUPPLIED, DEFAULT FRAME TAKING UP THE WHOLE TEXTURE IS USED).
     * @type {string}
    */
    configJson?: TexturePackerConfig;
}
