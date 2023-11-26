import { Background, Camera, Scene } from "../../engine/GETS";
import { Bird } from "../entities/Bird";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");

        const gameCam: Camera = new Camera("GameCam");    

        this.addCamera(gameCam);
        this.setCurrentCamera("GameCam");

        this.addEntities(
            new Bird(),
            new Background("background")
        );
    }
}
