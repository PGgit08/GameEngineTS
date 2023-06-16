import { Camera, DefaultEntity, Entity, MoveBehavior, Scene } from "../../engine/GETS";
import { LookAtBehavior } from "../behaviors/LookAtBehavior";
import { Entity1 } from "../entities/Entity1";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const ent: Entity = Entity.Spawn(Entity1);
        const ent2: Entity = Entity.Spawn(DefaultEntity);

        const cam: Camera = new Camera("Cam");

        cam.size = 5;

        ent2.addBehaviors(new MoveBehavior());
        ent.addBehaviors(new LookAtBehavior());

        ent2.transform.ignoreCamSize = true;

        this.addCamera(cam);
        this.setCurrentCamera("Cam");

        super.load();
    }
}
