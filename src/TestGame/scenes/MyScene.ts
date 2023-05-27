import { vec2 } from "gl-matrix";
import { Entity, MoveBehavior, Scene, SpriteComponent, DefaultEntity, Color, Camera } from "../../engine/GETS";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const cam: Camera = new Camera("Example Camera");

        const entity1 = Entity.Spawn(DefaultEntity);
        const entity2 = Entity.Spawn(DefaultEntity);

        entity2.getComponent(SpriteComponent).sprite.material.color = Color.ORANGE;

        entity1.transform.scale = vec2.fromValues(3, 3);

        entity1.addChildren(cam);
        entity2.addBehaviors(new MoveBehavior());

        cam.startFollow(entity2);

        this.setCurrentCamera("Example Camera");

        setTimeout(() => {
            // pretty bad user experience right here
            // entity1.removeChild(cam);
            // this.addCamera(cam);
            // this.setCurrentCamera("Example Camera");
            // cam.followRotation = false;
            // cam.startFollow(entity1);
        }, 1000);

        super.load();
    }
}
