import {
    AnimatedSprite,
    AnimationFrameOrder,
    Camera,
    DefaultEntity,
    Entity,
    MoveBehavior,
    Scene,
    SpriteComponent
} from "../../engine/GETS";

import { Background } from "../entities/Background";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    public load(): void {
        const cam = new Camera("Cam");
        const background = new Background("Background");

        const person = new Entity("Person");

        Entity.Spawn(DefaultEntity);

        person.addComponents(
            new SpriteComponent(
                new AnimatedSprite(
                    {animationFrameOrder: AnimationFrameOrder.Sequential, timePerFrame: 0.5},
                    "ArmsAnimation"
                )
            )
        )

        person.addComponents(new MoveBehavior(50));
        // cam.addBehaviors(new MoveBehavior(50));

        cam.size = 1;
		
        this.setCurrentCamera("Cam");

        this.addEntities(person);
        this.addEntities(background);

        super.load();
    }
}
