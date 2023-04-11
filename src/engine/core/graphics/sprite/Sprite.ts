import { mat3, vec2 } from "gl-matrix";
import { TextureManager } from "../../managers/TextureManager";
import { Frame } from "../Frame";
import { Geometry } from "../geometry/Geometry";
import { Square } from "../geometry/Square";
import { StandardMaterial } from "../material/StandardMaterial";
import { Mesh } from "../Mesh";
import { Texture } from "../Texture";

export class Sprite extends Mesh {
    private _frame: Frame = Frame.defaultFrame();
    private _texture: Texture;

    /**
     * Represents any 2D Mesh that renders a Texture.
     * @param textureName The name of the Texture that this Sprite uses. (if nothing supplied, only tint is used)
     * @param frameName The name of the Texture Frame to use (default is full Texture).
     * @param origin An optional origin vector for this Sprite (default is (0.5, 0.5)).
     * @param geometry An optional Geometry for this Sprite (default is Square).
     */
    constructor(textureName?: string, frameName?: string, origin?: vec2, geometry: Geometry = new Square()) {
        const texture = TextureManager.getInstance().getTextureByName(textureName);

        super(geometry, new StandardMaterial(texture, undefined));

        this._texture = texture;

        if (origin !== undefined) {
            geometry.origin = origin;
            geometry.calcPosXY();
            geometry.setPositionBuffer(geometry.positionData());
        }

        this._frame = this._texture.getFrame(frameName);

        // set texture buffer with Frame info
        this._geometry.setTexBuffer(this._geometry.textureData(
            this._frame.minTexX, this._frame.minTexY,
            this._frame.maxTexX, this._frame.maxTexY
        ));
    }

    /**
     * Sets the current Texture Frame for this Sprite.
     * @param frameName The name of the Frame of this Sprite's Texture to render.
     */
    public setFrame(frameName: string): void {
        this._frame = this._texture.getFrame(frameName);

        this._geometry.setTexBuffer(this._geometry.textureData(
            this._frame.minTexX, this._frame.minTexY,
            this._frame.maxTexX, this._frame.maxTexY
        ));

        this._geometry.uploadTextureBuffer();
    }
}
