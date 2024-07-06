import { Color, Entity, Sprite, SpriteComponent } from "../../engine/GETS";
import { BirdBehavior } from "../behaviors/BirdBehavior";

export class Bird extends Entity {
    constructor() {
        super("Bird");

        this.addComponents(new SpriteComponent(
            new Sprite("bird", undefined, undefined, undefined, Color.WHITE)
        ), new BirdBehavior());
    }
}