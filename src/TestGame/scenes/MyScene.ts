import { DefaultEntity, Entity, MoveBehavior, Scene } from "../../engine/GETS";
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
        const ent3: Entity = Entity.Spawn(DefaultEntity);

        ent2.addChildren(ent);
        ent3.addChildren(ent2);

        ent.transform.position[0] = 300;
        ent.addBehaviors(new LookAtBehavior());
        ent2.addBehaviors(new MoveBehavior());
        ent3.addBehaviors(new MoveBehavior());

        super.load();
    }
}
