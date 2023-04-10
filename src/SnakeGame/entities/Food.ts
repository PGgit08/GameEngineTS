import { vec2 } from "gl-matrix";
import { Entity, SpriteComponent, Sprite } from "../../engine/GETS";

export class Food extends Entity {
    constructor(){
        super("Food");

        this.transform.scale = vec2.fromValues(0.15, 0.15);

        this.addComponents(
            new SpriteComponent(
                new Sprite('emoji')
            )
        )
    }
}
