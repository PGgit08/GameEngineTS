import {
    AnimatedSprite,
    AnimationFrameOrder,
    Camera,
    Entity,
    MoveBehavior,
    Scene,
    SpriteComponent
} from "../../engine/GETS";

import { Background } from "../entities/Background";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");

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
        cam.addBehaviors(new MoveBehavior(50));

        cam.size = 1;
		
        this.setCurrentCamera("Cam");

        this.addEntities(person);
        this.addEntities(background);
    }
}
