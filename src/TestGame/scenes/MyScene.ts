import {
    Color,
    DefaultEntity,
    Entity,
    MoveBehavior,
    Scene,
    SpriteComponent
} from "../../engine/GETS";

import { LookAtBehavior } from "../behaviors/LookAtBehavior";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const black = Entity.Spawn(DefaultEntity);
        const green = Entity.Spawn(DefaultEntity);

        black.getComponent(SpriteComponent).sprite.material.color = Color.BLACK;
        green.getComponent(SpriteComponent).sprite.material.color = Color.GREEN;

        black.addBehaviors(new MoveBehavior(50), new LookAtBehavior());
        black.addChildren(green);

        green.transform.position[0] = 100;

        this.addEntities(black);

        black.getComponent(SpriteComponent).layerOrder = 0;
        black.getComponent(SpriteComponent).layer = "Background";

        super.load();
    }
}
