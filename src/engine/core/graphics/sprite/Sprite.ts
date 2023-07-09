import { vec2 } from "gl-matrix";
import { TextureManager } from "../../managers/TextureManager";
import { Frame } from "../Frame";
import { Geometry } from "../geometry/Geometry";
import { Square } from "../geometry/Square";
import { StandardMaterial } from "../material/StandardMaterial";
import { Mesh } from "../Mesh";
import { Texture } from "../Texture";
import { Color } from "../Color";
import { BufferConfig } from "../../config/BufferConfig";


/**
 * @classdesc
 * This object is a {@link Mesh} that specifically focuses on rendering {@link Texture} objects. 
 * It is similar to a Mesh and it has built in functions for easily setting the {@link Frame} of the Texture it is using and for setting
 * the origin of the Sprite.
 * 
 * @class Sprite
 * @extends Mesh
 * 
 * @param {string} [textureName] - The name of the Texture this Sprite uses (DEFAULT IS WHITE TEXTURE).
 * @param {string} [frameName] - The name of the Frame of the Texture to use (DEFAULT IS FULL TEXTURE FRAME).
 * @param {vec2} [origin] - The origin of this Sprite (DEFAULT IS (0.5, 0.5)).
 * @param {Geometry} [geometry] - The Geometry of this Sprite (DEFAULT IS 100x100 {@link Square}).
 * @param {Color} [color] - The Color of this Sprite (DEFAULT IS BLACK).
 */
export class Sprite extends Mesh {
    private _frame: Frame = Frame.DefaultFrame();
    private _texture: Texture;

    /** The Frame that this Sprite is currently using. @type {Frame} */
    public get frame(): Frame {
        return this._frame;
    }

    /** The Texture that this Sprite is currently using. @type {Texture} */
    public get texture(): Texture {
        return this._texture;
    }

    constructor(textureName?: string, frameName?: string, origin?: vec2, geometry: Geometry = new Square(100, 100), color?: Color) {
        const texture = TextureManager.getInstance().getTexture(textureName);

        super("Sprite", geometry, new StandardMaterial(texture, color));

        this._texture = texture;

        if (origin !== undefined) {
            this._geometry.origin = origin;
            this._geometry.calcPosXY();
            this._geometry.setBuffer(BufferConfig.BUFFER_NAMES.POSITION_BUFFER_NAME, geometry.positionData());
        }

        this._frame = this._texture.getFrame(frameName);

        // set texture buffer with Frame info
        this._geometry.setBuffer(BufferConfig.BUFFER_NAMES.TEXTURE_BUFFER_NAME, this._geometry.textureData(
            this._frame.minTexX, this._frame.minTexY,
            this._frame.maxTexX, this._frame.maxTexY
        ));
    }

    // sets the frame used by this Sprite's Texture
    private setFrame(frame: Frame): void {
        this._frame = frame;

        this._geometry.setBuffer(BufferConfig.BUFFER_NAMES.TEXTURE_BUFFER_NAME, this._geometry.textureData(
            this._frame.minTexX, this._frame.minTexY,
            this._frame.maxTexX, this._frame.maxTexY
        ));

        this._geometry.uploadBuffer(BufferConfig.BUFFER_NAMES.TEXTURE_BUFFER_NAME);
    }

    /**
     * Sets the current Frame of this Sprite's Texture by its name.
     * 
     * @param {string} frameName - The name of the Frame of this Sprite's Texture to render.
     */
    public setFrameByName(frameName: string): void {
        this._frame = this._texture.getFrame(frameName);

        this.setFrame(this._frame);
    }
}
