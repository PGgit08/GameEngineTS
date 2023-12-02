import { Camera, RendererManager, Scene } from "../../engine/GETS";
import { Bird } from "../entities/Bird";
import { GameBackground } from "../entities/GameBackground";

export class MainScene extends Scene {
    constructor() {
        super("MainScene");

        const gameCam: Camera = new Camera("GameCam");
        const background2: GameBackground = new GameBackground();

        background2.transform.position[0] = RendererManager.getInstance().currentRenderer.width;

        this.addCamera(gameCam);
        this.setCurrentCamera("GameCam");

        this.addEntities(
            // new Bird(),
            new GameBackground(),
            // background2
        );

        this.layers.e()
    }
}
