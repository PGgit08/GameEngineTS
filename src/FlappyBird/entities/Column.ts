import { Color, Entity, Sprite, SpriteComponent } from "../../engine/GETS";

export class Column extends Entity {
    constructor() {
        super("Column");

        this.addComponents(new SpriteComponent(
            new Sprite("column", undefined, undefined, undefined, Color.WHITE),
            "Background",
            0
        ));
    }
}
