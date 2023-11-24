import { Buffer } from "../gl/Buffer";
import { Geometry } from "../graphics/geometry/Geometry";

/**
 * A namespace containing the config for common buffers.
 * 
 * @namespace BufferConfig
 */
export namespace BufferConfig {
    /** The names of the {@link Buffer} objects that any {@link Geometry} must have. @namespace BUFFER_NAMES */
    export namespace BUFFER_NAMES {
        export const POSITION_BUFFER_NAME: string = "POSITION_BUFFER";
        export const TEXTURE_BUFFER_NAME: string = "TEXTURE_BUFFER";
    }
}
