import { Background, Entity, SpriteComponent } from "../../engine/GETS";
import { BackgroundBehavior } from "../behaviors/BackgroundBehavior";

export class GameBackground extends Entity {
    constructor() {
        super("GameBackground");

        const ground = new Background("Ground", "ground");
        
        ground.transform.position[1] = 270;
        ground.transform.scale[1] = 2;
        ground.getComponent(SpriteComponent).layerOrder = 0;

        const city = new Background("City", "background");
        city.getComponent(SpriteComponent).layerOrder = 1;


        this.addChildren(
            ground,
            city
        )

        // this.addComponents(new BackgroundBehavior());
    }
}
