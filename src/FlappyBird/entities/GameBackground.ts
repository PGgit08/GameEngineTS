import { Background, Entity } from "../../engine/GETS";
import { Ground } from "./Ground";

export class GameBackground extends Entity {
    constructor() {
        super("GameBackground");

        this.addChildren(
            new Ground(),
            // new Background("background"),
        )
    }
}
