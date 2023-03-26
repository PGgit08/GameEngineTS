/**
 * Represents the structure of a frame from the config JSON file from the TexturePacker software.
 */
export interface TexturePackerFrame {
    filename: string;
    frame: {x: number, y: number, w: number, h: number}
}

/**
 * Represents the structure of a config JSON file from the TexturePacker software.
 */
export interface TexturePackerConfig {
    frames: TexturePackerFrame[];

    meta: {
        size: {w: number, h: number}
    };
}
