import { Entity, Scene, DefaultEntity } from "../../engine/GETS";
import { LookAtBehavior } from "../behaviors/LookAtBehavior";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const ent: Entity = Entity.Spawn(DefaultEntity);
        const ent2: Entity = Entity.Spawn(DefaultEntity);

        ent2.addChildren(ent);
        ent.transform.position[0] = 300;

        ent.addBehaviors(new LookAtBehavior());
        ent.transform.rotation = 0;

        super.load();
    }
}
