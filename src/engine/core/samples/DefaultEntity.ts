import { vec2 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { Color } from "../graphics/Color";
import { Square } from "../graphics/geometry/Square";
import { SpriteComponent } from "../graphics/sprite/SpriteComponent";
import { RendererManager } from "../managers/RendererManager";
import { Sprite } from "../../GETS";

// THIS WOULD PROBABLY BE A PREFAB
/**
 * An Entity with a Square Mesh instantiated at the center of the screen.
 */
export class DefaultEntity extends Entity {
    constructor() { 
        super("DefaultEntity");
        
        this.transform.position = vec2.fromValues(
            RendererManager.getInstance().currentRenderer.width / 2,
            RendererManager.getInstance().currentRenderer.height / 2
        )

        this.addComponents(new SpriteComponent(new Sprite(undefined, undefined, undefined, new Square(), Color.GREEN)));
    }
}
