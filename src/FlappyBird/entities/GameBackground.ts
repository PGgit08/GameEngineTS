import { Background, Entity, EventManager, SpriteComponent } from "../../engine/GETS";
import { BackgroundBehavior } from "../behaviors/BackgroundBehavior";
import { DualColumns } from "./DualColumns";

export class GameBackground extends Entity {
    constructor() {
        super("GameBackground");

        const ground = new Background("Ground", "ground", "Ground");
        
        ground.transform.position[1] = 270;
        ground.transform.scale[1] = 2;
        ground.getComponent(SpriteComponent).layerOrder = 0;

        const city = new Background("City", "background", "Background");
        city.getComponent(SpriteComponent).layerOrder = 1;

        this.addChildren(
            city,
            ground,
            new DualColumns() // FOR TESTING PURPOSE
        );

        this.addComponents(new BackgroundBehavior());
    }
}
