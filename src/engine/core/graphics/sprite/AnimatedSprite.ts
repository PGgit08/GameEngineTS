import { mat3, vec2 } from "gl-matrix";
import { Sprite } from "./Sprite";
import { Geometry } from "../geometry/Geometry";
import { Square } from "../geometry/Square";
import { Time } from "../../helpers/Time";
import { AnimatedSpriteConfig, AnimationFrameOrder } from "../../config/AnimatedSpriteConfig";

export class AnimatedSprite extends Sprite {
    private _startFrameIndex: number; // the index at which to start the animation
    private _currentFrameIndex: number; // the current frame which is being indexed for animation
    private _frameIndexCounter: number; // the value by which to increment the index by in each frame
    private _resetAnimationIndex: number; // the index at which to reset the animation
    private _animationFrames: string[]; // the frames to animate (names)

    private _timeSinceLastFrame: number = 0;

    private _animatedSpriteInfo: AnimatedSpriteConfig;

    public isPlaying: boolean = true;

    /**
     * Creates an Animated Sprite.
     * @param animatedSpriteInfo The info for this Animated Sprite.
     * @param textureName The Texture used by this Animated Sprite.
     * @param origin The origin vector for this Animated Sprite (default is (0.5, 0.5)).
     * @param geometry The geometry used for this Animated Sprite (default is Square).
     */
    constructor(animatedSpriteInfo: AnimatedSpriteConfig, textureName?: string, origin?: vec2, geometry: Geometry = new Square(100, 100)) {
        super(textureName, undefined, origin, geometry);

        switch (animatedSpriteInfo.animationFrameOrder) {
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
                if (animatedSpriteInfo.customFrameOrder === undefined) {
                    throw new Error("Custom Frame order not supplied for Animated Sprite.");
                }

                this._startFrameIndex = 0;
                this._frameIndexCounter = 1;
                this._resetAnimationIndex = animatedSpriteInfo.customFrameOrder.length;
                this._animationFrames = animatedSpriteInfo.customFrameOrder;
                break;
        }

        this._currentFrameIndex = this._startFrameIndex;
        this._animatedSpriteInfo = animatedSpriteInfo;

        this.setFrameByName(this._animationFrames[this._currentFrameIndex]); // set initial frame
    }

    public override draw(model: mat3, projection: mat3, view: mat3): void {
        this._timeSinceLastFrame += Time.DeltaTime(); // Use deltaTime in case of rendering lag

        if (!this.isPlaying) {
            super.draw(model, projection, view);
            return;
        }

        if (this._timeSinceLastFrame > this._animatedSpriteInfo.timePerFrame) {
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
