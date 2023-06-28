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

    // experimenting with LOAD placement
    public override load(): void {
        const cam = new Camera("Cam");
        const background = new Background("Background");

        const person = new Entity("Person");

        person.addComponents(
            new SpriteComponent(
                new AnimatedSprite(
                    {animationFrameOrder: AnimationFrameOrder.Sequential, timePerFrame: 0.5},
                    "ArmsAnimation"
                )
            )
        )

        person.addBehaviors(new MoveBehavior(50));

        cam.addChildren(background);

        cam.size = 1;

        this.addCamera(cam);
        this.setCurrentCamera("Cam");

        this.addEntities(person);

        super.load();
    }
}
