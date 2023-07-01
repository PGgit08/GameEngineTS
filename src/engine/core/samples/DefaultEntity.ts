import { Entity } from "../ecs/Entity";
import { SpriteComponent } from "../graphics/sprite/SpriteComponent";
import { Sprite } from "../graphics/sprite/Sprite";
import { MoveBehavior } from "./MoveBehavior";

// THIS WOULD PROBABLY BE A PREFAB
/**
 * An Entity with a Square Sprite instantiated at the center of the screen. This Entity has a MoveBehavior added.
 */
export class DefaultEntity extends Entity {
    constructor() { 
        super("DefaultEntity");

        this.addComponents(new SpriteComponent(new Sprite()), new MoveBehavior(50));
    }
}
