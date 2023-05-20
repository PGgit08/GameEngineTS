import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, AnimatedSprite, AnimationFrameOrder, DefaultEntity, Sprite, Behavior, NoZoomBehavior } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const entity1: Entity = new Entity("Entity1");

        entity1.addComponents(
            new SpriteComponent(
                new AnimatedSprite({
                    animationFrameOrder: AnimationFrameOrder.Reversed,
                    timePerFrame: 0.5
                }, 'ArmsAnimation')
            )
        );

        this.currentCamera.transform.position = vec2.fromValues(0, 0);
        this.currentCamera.width = 2000;
        this.currentCamera.height = 2000;
        this.currentCamera.transform.rotation = 0;

        this.currentCamera.addComponents(
            new SpriteComponent(
                new Sprite()
            )
        );

        this.currentCamera.addBehaviors(new NoZoomBehavior());

        Entity.Spawn(DefaultEntity).transform.position = vec2.fromValues(0, 0);

        entity1.addChildren(this.currentCamera);
        entity1.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(0, 0);
        entity1.transform.scale = vec2.fromValues(1.3, 1.3);

        this.addEntities(entity1);

        super.load();
    }
}
