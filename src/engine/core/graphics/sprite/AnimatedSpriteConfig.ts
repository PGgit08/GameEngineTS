import { AnimatedSprite } from "./AnimatedSprite";

/**
 * Describes the order in which to animate the Frames in an Animated Sprite.
 */
export enum AnimationFrameOrder {
    /** Sequentially moves from the start of a TexturePacker Frame array to its end. */
    Sequential,
    
    /** Starts at the end of a TexturePacker Frame array and moves to its start. */
    Reversed,

    /** Used to create custom Frame animation orders, "customFrameOrder" field in {@link AnimatedSpriteConfig} must be filled. */
    Custom
}

/**
 * The information for an {@link AnimatedSprite}
 */
export interface AnimatedSpriteConfig {
    animationFrameOrder: AnimationFrameOrder;
    customFrameOrder?: string[];
    timePerFrame: number;
}
