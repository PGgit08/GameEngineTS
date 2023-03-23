import { DefaultRenderer, Engine } from "../engine/GETS"
import { MainScene } from "./scenes/MainScene";

new Engine(
    {
        renderers: [DefaultRenderer],
        scenes: [MainScene],
        textures: [
            {name: 'f-texture', fileName: new URL('./assets/f-texture.png', import.meta.url).href}
        ],
        defaults: {
            renderer: "DefaultRenderer",
            scene: "MainScene"
        }
    }
);

export {}
