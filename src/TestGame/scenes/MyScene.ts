import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, AnimatedSprite, AnimationFrameOrder, DefaultEntity, NoZoomBehavior, Sprite, Color, Camera } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const entity1: Entity = new Entity("Entity1");
        const cam: Camera = new Camera("Example Camera");

        entity1.addComponents(
            new SpriteComponent(
                new AnimatedSprite({
                    animationFrameOrder: AnimationFrameOrder.Reversed,
                    timePerFrame: 0.5
                }, 'ArmsAnimation')
            )
        );

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
        cam.addBehaviors(new NoZoomBehavior(), new MoveBehavior());

        cam.transform.scale = vec2.fromValues(0.5, 0.5);

        this.addEntities(entity1);

        this.addCamera(cam);
        this.setCurrentCamera("Example Camera");

        super.load();
    }
}
