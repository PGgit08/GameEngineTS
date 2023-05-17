/**
 * Contains the names and sizes of attributes in Geometries and Shaders.
 */
export class ShaderConfig {
    public static readonly ATTRIB_NAMES = {
        POSITION_ATTRIBUTE_NAME: "a_position",
        TEXTURE_ATTRIBUTE_NAME: "a_texcoord"
    }

    public static readonly UNIFORM_NAMES = {
        MODEL_MAT: "u_model",
        PROJ_MAT: "u_projection",
        VIEW_MAT: "u_view"
    }

    public static readonly ATTRIB_SIZES = {
        POSITION_ATTRIB_SIZE: 2,
        TEXTURE_ATTRIB_SIZE: 2
    }
}
