import { Scene } from "../../engine/GETS";
import { Bird } from "../entities/Bird";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");

        this.addEntities(new Bird());
        this.setCurrentCamera("BirdCam");
    }
}
