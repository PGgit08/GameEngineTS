import { mat3, vec2 } from "gl-matrix";
import { Sprite } from "./Sprite";
import { Geometry } from "../geometry/Geometry";
import { Square } from "../geometry/Square";
import { Time } from "../../../extra/Time";
import { AnimatedSpriteInfo } from "./AnimatedSpriteInfo";

export class AnimatedSprite extends Sprite {
    private _currentFrameIndex: number = 0;
    private _timeSinceLastFrame: number = 0;

    private _animatedSpriteInfo: AnimatedSpriteInfo;

    /**
     * Creates an Animated Sprite.
     * @param animatedSpriteInfo The info for this Animated Sprite.
     * @param textureName The Texture used by this Animated Sprite.
     * @param origin The origin vector for this Animated Sprite (default is (0.5, 0.5)).
     * @param geometry The geometry used for this Animated Sprite (default is Square).
     */
    constructor(animatedSpriteInfo: AnimatedSpriteInfo, textureName?: string, origin?: vec2, geometry: Geometry = new Square()) {
        super(textureName, animatedSpriteInfo.frameOrder[0], origin, geometry);

        this._animatedSpriteInfo = animatedSpriteInfo;
    }

    public override render(model: mat3, projection: mat3): void {
        this._timeSinceLastFrame += Time.deltaTime(); // Use deltaTime in case of rendering lag

        if (this._timeSinceLastFrame > this._animatedSpriteInfo.timePerFrame) {
            if (this._currentFrameIndex + 1 > this._animatedSpriteInfo.frameOrder.length) {
                this._currentFrameIndex = 0;
            }

            this._timeSinceLastFrame = 0;

            this.setFrame(this._animatedSpriteInfo.frameOrder[this._currentFrameIndex]);

            this._currentFrameIndex ++;
        }

        super.render(model, projection);
    }
}
