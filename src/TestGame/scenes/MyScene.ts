import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, AnimatedSprite, AnimationFrameOrder } from "../../engine/GETS";
import { Sprite } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

        const entity1: Entity = new Entity("Entity1");

        entity1.addComponents(
            new SpriteComponent(
                new AnimatedSprite({
                    animationFrameOrder: AnimationFrameOrder.Reversed,
                    customFrameOrder: ["Frame1", "Frame1", "Frame3", "Frame2"],
                    timePerFrame: 0.5
                }, 'ArmsAnimation')
            )
        );

        this.currentCamera.transform.position = vec2.fromValues(300, 0);
        this.currentCamera.width = 700;
        this.currentCamera.height = 500;
        this.currentCamera.transform.rotation = 70;

        this.currentCamera.addComponents(
            new SpriteComponent(
                new Sprite()
            )
        );

        // entity1.addBehaviors(new MoveBehavior());
        this.currentCamera.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(0, 0);
        entity1.transform.scale = vec2.fromValues(1.3, 1.3);

        this.addEntities(entity1);
    }
}
