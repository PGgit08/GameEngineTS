import { Entity } from "../ecs/Entity";
import { Square } from "../graphics/geometry/Square";
import { SpriteComponent } from "../graphics/sprite/SpriteComponent";
import { Sprite } from "../graphics/sprite/Sprite";
import { MoveBehavior } from "./MoveBehavior";

// THIS WOULD PROBABLY BE A PREFAB
/**
 * An Entity with a Square Mesh instantiated at the center of the screen.
 */
export class DefaultEntity extends Entity {
    constructor() { 
        super("DefaultEntity");

        this.addComponents(new SpriteComponent(new Sprite(undefined, undefined, undefined, new Square(100, 100))));
        this.addBehaviors(new MoveBehavior(50));
    }
}
