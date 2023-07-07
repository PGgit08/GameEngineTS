export namespace ShaderConfig {
    export namespace ATTRIB_NAMES {
        export const POSITION_ATTRIBUTE_NAME: string = "a_position";
        export const TEXTURE_ATTRIBUTE_NAME: string = "a_texcoord";
    }

    export namespace UNIFORM_NAMES {
        export const MODEL_MAT: string = "u_model";
        export const PROJ_MAT: string = "u_projection";
        export const VIEW_MAT: string = "u_view";
        export const TEXTURE: string = "u_texture";
        export const COLOR: string = "u_color";
    }

    export namespace ATTRIB_SIZES {
        export const POSITION_ATTRIB_SIZE: number = 2;
        export const TEXTURE_ATTRIB_SIZE: number = 2;
    }
}
