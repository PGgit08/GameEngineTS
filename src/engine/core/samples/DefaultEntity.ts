import { Entity } from "../ecs/Entity";
import { Square } from "../graphics/geometry/Square";
import { ColorMaterial } from "../graphics/material/ColorMaterial";
import { Mesh } from "../graphics/Mesh";
import { MeshComponent } from "../graphics/MeshComponent";
import { RendererManager } from "../managers/RendererManager";
import { Vector2 } from "../math/Vector2";

// THIS WOULD PROBABLY BE A PREFAB
/**
 * An Entity with a Square Mesh instantiated at the center of the screen.
 */
export class DefaultEntity extends Entity {
    constructor() { 
        super("DefaultEntity");
        
        this.transform.position = new Vector2(
            RendererManager.getInstance().currentRenderer.width / 2,
            RendererManager.getInstance().currentRenderer.height / 2
        )

        this.addComponents(new MeshComponent(new Mesh(new Square(), new ColorMaterial())));
    }
}
