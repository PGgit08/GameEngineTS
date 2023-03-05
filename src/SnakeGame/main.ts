import { DefaultRenderer, Engine } from "../engine/GETS"
import { MainScene } from "./scenes/MainScene";

new Engine(
    {
        renderers: [DefaultRenderer],
        scenes: [MainScene],
        defaults: {
            renderer: "DefaultRenderer",
            scene: "MainScene"
        }
    }
);

export {}
