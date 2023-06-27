import {
    Camera,
    DefaultEntity,
    Entity,
    Scene
} from "../../engine/GETS";

import { Background } from "../entities/Background";

export class MyScene extends Scene {
    constructor() {
        super("MyScene");
    }

    // experimenting with LOAD placement
    public override load(): void {
        const cam = new Camera("Cam");
        const background = new Background("FTEXT");

        Entity.Spawn(DefaultEntity);

        cam.addChildren(background);

        cam.size = 5;

        this.addCamera(cam);
        this.setCurrentCamera("Cam");

        super.load();
    }
}
