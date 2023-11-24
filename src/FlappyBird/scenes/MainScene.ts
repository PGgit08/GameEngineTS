import { Scene } from "../../engine/GETS";
import { Background } from "../entities/Background";
import { Bird } from "../entities/Bird";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");

        this.addEntities(
            new Background("background"),
            new Bird()
        );

        this.setCurrentCamera("E");
    }
}
