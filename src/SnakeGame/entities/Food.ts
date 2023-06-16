import { vec2 } from "gl-matrix";
import { Entity, SpriteComponent, Sprite, Color } from "../../engine/GETS";

export class Food extends Entity {
    constructor(){
        super("Food");

        this.transform.scale = vec2.fromValues(0.15, 0.15);

        this.addComponents(
            new SpriteComponent(
                new Sprite('emoji')
            )
        );

        this.getComponent(SpriteComponent).sprite.material.color = Color.WHITE;
    }
}
