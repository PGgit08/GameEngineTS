import { Color, Entity, Sprite, SpriteComponent } from "../../engine/GETS";

export class Entity1 extends Entity {
    constructor() {
        super("Entity1");

        this.addComponents(
            new SpriteComponent(
                new Sprite("FTEXT")
            )
        );

        this.getComponent(SpriteComponent).sprite.material.color = Color.WHITE;
    }
}