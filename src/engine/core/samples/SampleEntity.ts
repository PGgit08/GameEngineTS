import { Entity } from "../ecs/Entity";
import { SpriteComponent } from "../graphics/sprite/SpriteComponent";
import { Sprite } from "../graphics/sprite/Sprite";
import { MoveBehavior } from "./MoveBehavior";

/**
 * @classdesc
 * A {@link Entity} with a Square Sprite. This Entity has a MoveBehavior added.
 * 
 * @class SampleEntity
 * @extends Entity
 */
export class SampleEntity extends Entity {
    constructor() { 
        super("SampleEntity");

        this.addComponents(new SpriteComponent(new Sprite()), new MoveBehavior(50));
    }
}
