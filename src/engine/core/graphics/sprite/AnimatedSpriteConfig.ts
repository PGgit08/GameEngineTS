import { AnimatedSprite } from "./AnimatedSprite";

/**
 * The information for an {@link AnimatedSprite}
 */
export interface AnimatedSpriteConfig {
    frameOrder: string[];
    timePerFrame: number;
}
