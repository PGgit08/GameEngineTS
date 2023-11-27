import { Background, Entity } from "../../engine/GETS";
import { BackgroundBehavior } from "../behaviors/BackgroundBehavior";

export class GameBackground extends Entity {
    constructor() {
        super("GameBackground");

        const ground = new Background("Ground", "ground");
        ground.transform.position[1] = 270;
        ground.transform.scale[1] = 2;

        this.addChildren(
            ground,
            new Background("City", "background")
        )

        this.addComponents(new BackgroundBehavior());
    }
}
