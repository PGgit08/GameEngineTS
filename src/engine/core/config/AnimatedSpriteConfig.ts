import { AnimatedSprite } from "../graphics/sprite/AnimatedSprite";

/**
 * Describes the order in which to animate the Frames in an Animated Sprite.
 * 
 * @enum AnimationFrameOrder
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
 * The config for an {@link AnimatedSprite}.
 * 
 * @interface AnimatedSpriteConfig
 */
export interface AnimatedSpriteConfig {
    /** The animation order for the AnimatedSprite. @type {AnimationFrameOrder} */
    animationFrameOrder: AnimationFrameOrder;

    /** 
     * The custom frame order that needs to be filled if the {@link animationFrameOrder} is {@link AnimationFrameOrder.Custom}. 
     * @type {string[]} -> [frameName, frameName, ...]
     */
    customFrameOrder?: string[];

    /** The time per frame in seconds. @type {number} */
    timePerFrame: number;
}
