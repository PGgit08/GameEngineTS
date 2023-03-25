import { mat3 } from "gl-matrix";
import { TextureManager } from "../managers/TextureManager";
import { Frame } from "./Frame";
import { Square } from "./geometry/Square";
import { StandardMaterial } from "./material/StandardMaterial";
import { Mesh } from "./Mesh";
import { Texture } from "./Texture";

export class Sprite extends Mesh {
    private _frame: Frame;

    /**
     * Represents any 2D Mesh that renders a Texture.
     */
    constructor(textureName: string, frameName?: string) {
        const texture: Texture = TextureManager.getInstance().getTextureByName(textureName);

        super(new Square(), new StandardMaterial(texture, undefined));

        if (frameName !== undefined) {
            this._frame = texture.getFrame(frameName);
        } else {
            this._frame = texture.getDefaultFrame();
        }
    }

    public render(model: mat3, projection: mat3): void {
        super.render(model, projection);
    }
}
