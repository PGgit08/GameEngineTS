import { Camera, Entity, MoveBehavior } from "../../engine/GETS";
import { Background } from "./Background";

export class Bird extends Entity {
    constructor() {
        super("Bird");

        let birdCam = new Camera("BirdCam");

        birdCam.addChildren(
            new Background("background"),
        );

        this.addChildren(birdCam);
        this.addComponents(new MoveBehavior());
    }
}