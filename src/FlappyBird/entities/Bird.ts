import { Camera, Entity, MoveBehavior } from "../../engine/GETS";

export class Bird extends Entity {
    constructor() {
        super("Bird");

        let e: Camera = new Camera("E")

        this.addChildren(e);
        this.addComponents(new MoveBehavior());
    }
}