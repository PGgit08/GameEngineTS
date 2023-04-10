import { vec2 } from "gl-matrix";
import { Entity, SpriteComponent, TextureManager, Sprite } from "../../engine/GETS";

export class SnakeJoint extends Entity {
    constructor() {
        super("SnakeJoint");

        this.transform.scale = vec2.fromValues(0.2, 0.2);

        this.addComponents(
            new SpriteComponent(
                new Sprite('f-texture')
            )
        )
    }
}
