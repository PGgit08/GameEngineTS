import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, AnimatedSprite, AnimationFrameOrder } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

        const entity1: Entity = new Entity("Entity1");

        entity1.addComponents(
            new SpriteComponent(
                new AnimatedSprite({
                    animationFrameOrder: AnimationFrameOrder.Custom,
                    customFrameOrder: ['Sprite1', 'emoji', 'emoji'],
                    timePerFrame: 0.5
                }, 'testJson')
            )
        );

        entity1.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(300, 300);
        // entity1.transform.scale = vec2.fromValues(1.3, 1.3);

        this.addEntities(entity1);
    }
}
