import { mat3 } from "gl-matrix";
import { Square } from "./geometry/Square";
import { StandardMaterial } from "./material/StandardMaterial";
import { Mesh } from "./Mesh";
import { Texture } from "./Texture";

export class Sprite extends Mesh {
    /**
     * Represents any 2D Mesh that renders a Texture.
     */
    constructor(texture: Texture) {
        super(new Square(), new StandardMaterial(texture, undefined));
    }

    public render(model: mat3, projection: mat3): void {
        super.render(model, projection);
    }
}
