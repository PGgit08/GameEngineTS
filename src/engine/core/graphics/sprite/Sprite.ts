import { vec2 } from "gl-matrix";
import { TextureManager } from "../../managers/TextureManager";
import { Frame } from "../Frame";
import { Geometry } from "../geometry/Geometry";
import { Square } from "../geometry/Square";
import { StandardMaterial } from "../material/StandardMaterial";
import { Mesh } from "../Mesh";
import { Texture } from "../Texture";
import { Color } from "../Color";
import { BufferConfig } from "../../gl/BufferConfig";

export class Sprite extends Mesh {
    private _frame: Frame = Frame.defaultFrame();
    private _texture: Texture;

    public get frame(): Frame {
        return this._frame;
    }

    public get texture(): Texture {
        return this._texture;
    }

    /**
     * Represents any 2D Mesh that renders a Texture.
     * @param textureName The name of the Texture that this Sprite uses. (if nothing supplied, only tint is used)
     * @param frameName The name of the Texture Frame to use (default is full Texture).
     * @param origin An optional origin vector for this Sprite (default is (0.5, 0.5)).
     * @param geometry An optional Geometry for this Sprite (default is Square).
     * @param color An optional Color for this Sprite (default is BLACK).
     */
    constructor(textureName?: string, frameName?: string, origin?: vec2, geometry: Geometry = new Square(), color?: Color) {
        const texture = TextureManager.getInstance().getTextureByName(textureName);

        super(geometry, new StandardMaterial(texture, color));

        this._texture = texture;

        if (origin !== undefined) {
            this._geometry.origin = origin;
            this._geometry.calcPosXY();
            this._geometry.setBuffer(BufferConfig.POSITION_BUFFER_NAME, geometry.positionData());
        }

        this._frame = this._texture.getFrame(frameName);

        // set texture buffer with Frame info
        this._geometry.setBuffer(BufferConfig.TEXTURE_BUFFER_NAME, this._geometry.textureData(
            this._frame.minTexX, this._frame.minTexY,
            this._frame.maxTexX, this._frame.maxTexY
        ));
    }

    /**
     * Sets the current Texture Frame.
     * @param frame The Frame of this Sprite's Texture to render.
     */
    public setFrame(frame: Frame): void {
        this._frame = frame;

        this._geometry.setBuffer(BufferConfig.TEXTURE_BUFFER_NAME, this._geometry.textureData(
            this._frame.minTexX, this._frame.minTexY,
            this._frame.maxTexX, this._frame.maxTexY
        ));

        this._geometry.uploadBuffer(BufferConfig.TEXTURE_BUFFER_NAME);
    }

    /**
     * Sets the current Texture Frame by its name for this Sprite.
     * @param frameName The name of the Frame of this Sprite's Texture to render.
     */
    public setFrameByName(frameName: string): void {
        this._frame = this._texture.getFrame(frameName);

        this.setFrame(this._frame);
    }
}
