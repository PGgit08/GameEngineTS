import { vec2 } from "gl-matrix";
import { Triangle } from "../../engine/core/graphics/geometry/Triangle";
import { Entity, MoveBehavior, Scene, MeshComponent, Sprite } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

        const entity1: Entity = new Entity("Entity1");

        entity1.addComponents(
            new MeshComponent(
                new Sprite('testJson', 'Sprite1', vec2.fromValues(0.4, 0.7), undefined)
            )
        );

        entity1.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(300, 300);
        entity1.transform.scale = vec2.fromValues(1.3, 1.3);

        this.addEntities(entity1);
    }
}
