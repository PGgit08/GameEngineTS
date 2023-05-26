import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, AnimatedSprite, AnimationFrameOrder, DefaultEntity, NoZoomBehavior, Sprite, Color, Camera } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const cam: Camera = new Camera("Example Camera");

        const entity1 = Entity.Spawn(DefaultEntity);
        const entity2 = Entity.Spawn(DefaultEntity);

        entity1.addChildren(cam);
        entity1.addBehaviors(new MoveBehavior());

        this.setCurrentCamera("Example Camera");

        entity2.transform.position[0] = 100;

        super.load();
    }
}
