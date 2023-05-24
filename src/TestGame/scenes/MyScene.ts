import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, AnimatedSprite, AnimationFrameOrder, DefaultEntity, NoZoomBehavior, Sprite, Color, Camera } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const entity1: Entity = new Entity("Entity1");
        const entity2: Entity = new Entity("Entity2");

        const cam: Camera = new Camera("Example Camera");

        entity1.addComponents(
            new SpriteComponent(
                new AnimatedSprite({
                    animationFrameOrder: AnimationFrameOrder.Reversed,
                    timePerFrame: 0.5
                }, 'ArmsAnimation')
            )
        );

        entity1.addBehaviors(new MoveBehavior());

        entity1.transform.position = vec2.fromValues(0, 0);
        entity1.transform.scale = vec2.fromValues(1.3, 1.3);

        // create a "crosshair" sprite that belongs to the camera
        const camSprite: Sprite = new Sprite("Crosshair");
        camSprite.material.color = Color.GREEN;

        cam.addComponents(
            new SpriteComponent(
                camSprite
            )
        );

        // using this to prevent zoom on Sprites belonging to Camera
        cam.addBehaviors(new NoZoomBehavior());

        cam.startFollow(entity1);

        setTimeout(cam.stopFollow.bind(cam), 5000);

        cam.transform.scale = vec2.fromValues(0.5, 0.5);

        entity2.addChildren(cam);

        // add a default entity (for camera reference)
        Entity.Spawn(DefaultEntity).transform.position[0] = 200;

        this.addEntities(entity1, entity2);

        this.setCurrentCamera("Example Camera");

        super.load();
    }
}
