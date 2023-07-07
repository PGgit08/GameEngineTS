import { Shader } from "../gl/shader/Shader";

/**
 * A namespace containing the names and sizes of attributes and uniforms that any {@link Shader} must have.
 * 
 * @namespace ShaderConfig
 */
export namespace ShaderConfig {
    /** The names of the attributes that any Shader must have. @namespace ATTRIB_NAMES */
    export namespace ATTRIB_NAMES {
        export const POSITION_ATTRIBUTE_NAME: string = "a_position";
        export const TEXTURE_ATTRIBUTE_NAME: string = "a_texcoord";
    }

    /** The names of the uniforms that any Shader must have. @namespace UNIFORM_NAMES */
    export namespace UNIFORM_NAMES {
        export const MODEL_MAT: string = "u_model";
        export const PROJ_MAT: string = "u_projection";
        export const VIEW_MAT: string = "u_view";
        export const TEXTURE: string = "u_texture";
        export const COLOR: string = "u_color";
    }

    /** The sizes of the attributes that any Shader must have. @namespace ATTRIB_SIZES */
    export namespace ATTRIB_SIZES {
        export const POSITION_ATTRIB_SIZE: number = 2;
        export const TEXTURE_ATTRIB_SIZE: number = 2;
    }
}
