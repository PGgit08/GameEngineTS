import { vec2 } from "gl-matrix";
import { Entity, MeshComponent, TextureManager, Sprite } from "../../engine/GETS";

export class SnakeJoint extends Entity {
    constructor() {
        super("SnakeJoint");

        this.transform.scale = vec2.fromValues(0.2, 0.2);

        this.addComponents(
            new MeshComponent(
                new Sprite(TextureManager.getInstance().getTextureByName('f-texture'))
            )
        )
    }
}
