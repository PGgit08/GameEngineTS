import { Entity } from "../ecs/Entity";
import { SpriteComponent } from "../graphics/sprite/SpriteComponent";
import { Sprite } from "../graphics/sprite/Sprite";
import { MoveBehavior } from "./MoveBehavior";

/**
 * An Entity with a Square Sprite instantiated at the center of the screen. This Entity has a MoveBehavior added.
 */
export class SampleEntity extends Entity {
    constructor() { 
        super("SampleEntity");

        this.addComponents(new SpriteComponent(new Sprite()), new MoveBehavior(50));
    }
}
