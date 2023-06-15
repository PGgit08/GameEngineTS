import { Entity, Scene } from "../../engine/GETS";
import { LookAtBehavior } from "../behaviors/LookAtBehavior";
import { Entity1 } from "../entities/Entity1";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const ent: Entity = Entity.Spawn(Entity1);
        // const ent2: Entity = Entity.Spawn(DefaultEntity);
        // const ent3: Entity = Entity.Spawn(DefaultEntity);

        ent.transform.rotation = -1;
        ent.addBehaviors(new LookAtBehavior());

        // ent3.getComponent(SpriteComponent).sprite.material.color = Color.BLACK;
        // ent2.getComponent(SpriteComponent).sprite.material.color = Color.ORANGE;

        // ent2.addChildren(ent);
        // ent2.addBehaviors(new MoveBehavior());

        // ent.transform.position[0] = 300;

        // ent.transform.rotation = 0;
        // this.currentCamera.startFollow(ent);
        // ent.addChildren(this.currentCamera);

        super.load();
    }
}
