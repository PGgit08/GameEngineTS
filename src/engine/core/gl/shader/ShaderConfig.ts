import ReadonlyDictionary from "../../../types/ReadonlyDictionary"

/**
 * Contains the names and sizes of attributes and uniforms that any Shader MUST have.
 */
export class ShaderConfig {
    public static readonly ATTRIB_NAMES: ReadonlyDictionary<string, string> = {
        POSITION_ATTRIBUTE_NAME: "a_position",
        TEXTURE_ATTRIBUTE_NAME: "a_texcoord"
    }

    public static readonly UNIFORM_NAMES: ReadonlyDictionary<string, string> = {
        MODEL_MAT: "u_model",
        PROJ_MAT: "u_projection",
        VIEW_MAT: "u_view",
        TEXTURE: "u_texture",
        COLOR: "u_color"
    }

    public static readonly ATTRIB_SIZES: ReadonlyDictionary<string, number> = {
        POSITION_ATTRIB_SIZE: 2,
        TEXTURE_ATTRIB_SIZE: 2
    }
}
