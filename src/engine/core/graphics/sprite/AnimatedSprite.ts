import { mat3, vec2 } from "gl-matrix";
import { Sprite } from "./Sprite";
import { Geometry } from "../geometry/Geometry";
import { Square } from "../geometry/Square";
import { Time } from "../../helpers/Time";
import { AnimatedSpriteConfig, AnimationFrameOrder } from "../../config/AnimatedSpriteConfig";

import { Frame } from "../Frame";

/**
 * A {@link Sprite} that get animated through changing the {@link Frame} belonging to the Sprite periodically.
 * 
 * @class AnimatedSprite
 * @extends Sprite
 * 
 * @param {AnimatedSpriteConfig} animatedSpriteConfig - The config for this Animated Sprite.
 * @param {string} [textureName] - The Texture used by this Animated Sprite (DEFAULT IS WHITE TEXTURE).
 * @param {vec2} [origin] - The origin vector used by this Animated Sprite (DEFAULT IS (0.5, 0.5)).
 * @param {Geometry} [geometry] - The Geometry used by this Animated Sprite (DEFAULT IS {@link Square}).
 */
export class AnimatedSprite extends Sprite {
    private _startFrameIndex: number; // the index at which to start the animation
    private _currentFrameIndex: number; // the current frame which is being indexed for animation
    private _frameIndexCounter: number; // the value by which to increment the index by in each frame
    private _resetAnimationIndex: number; // the index at which to reset the animation
    private _animationFrames: string[]; // the frames to animate (names)

    private _timeSinceLastFrame: number = 0;

    private _animatedSpriteConfig: AnimatedSpriteConfig;

    /** A boolean controlling whether this Sprite's animation is being played or not. @type {boolean} */
    public isPlaying: boolean = true;

    constructor(animatedSpriteConfig: AnimatedSpriteConfig, textureName?: string, origin?: vec2, geometry: Geometry = new Square(100, 100)) {
        super(textureName, undefined, origin, geometry);

        switch (animatedSpriteConfig.animationFrameOrder) {
            case AnimationFrameOrder.Sequential:
                this._startFrameIndex = 0;
                this._frameIndexCounter = 1;
                this._resetAnimationIndex = this.texture.frameNames().length;
                this._animationFrames = this.texture.frameNames();
                break;

            case AnimationFrameOrder.Reversed:
                this._startFrameIndex = this.texture.frameNames().length - 1;
                this._frameIndexCounter = -1;
                this._resetAnimationIndex = -1;
                this._animationFrames = this.texture.frameNames();
                break;

            case AnimationFrameOrder.Custom:
                if (animatedSpriteConfig.customFrameOrder === undefined) {
                    throw new Error("Custom Frame order not supplied for Animated Sprite.");
                }

                this._startFrameIndex = 0;
                this._frameIndexCounter = 1;
                this._resetAnimationIndex = animatedSpriteConfig.customFrameOrder.length;
                this._animationFrames = animatedSpriteConfig.customFrameOrder;
                break;
        }

        this._currentFrameIndex = this._startFrameIndex;
        this._animatedSpriteConfig = animatedSpriteConfig;

        this.setFrameByName(this._animationFrames[this._currentFrameIndex]); // set initial frame
    }

    public override draw(model: mat3, projection: mat3, view: mat3): void {
        this._timeSinceLastFrame += Time.DeltaTime(); // Use deltaTime in case of rendering lag

        if (!this.isPlaying) {
            super.draw(model, projection, view);
            return;
        }

        if (this._timeSinceLastFrame > this._animatedSpriteConfig.timePerFrame) {
            this._timeSinceLastFrame = 0;

            this.setFrameByName(this._animationFrames[this._currentFrameIndex]);

            this._currentFrameIndex += this._frameIndexCounter; // go to next frame index 

            if (this._currentFrameIndex === this._resetAnimationIndex) { // reset animation
                this._currentFrameIndex = this._startFrameIndex;
            }
        }

        super.draw(model, projection, view);
    }
}
