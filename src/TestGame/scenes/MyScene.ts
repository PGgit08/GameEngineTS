import { Entity, Scene, DefaultEntity } from "../../engine/GETS";
import { LookAtBehavior } from "../behaviors/LookAtBehavior";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        Entity.Spawn(DefaultEntity).addBehaviors(new LookAtBehavior());

        super.load();
    }
}
