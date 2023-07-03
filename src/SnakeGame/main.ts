import { SampleRenderer, Engine } from "../engine/GETS"
import { MainScene } from "./scenes/MainScene";

new Engine(
    {
        renderers: [SampleRenderer],
        scenes: [MainScene],
        textures: [
            {name: 'f-texture', fileName: new URL('./assets/f-texture.png', import.meta.url).href},
            {name: 'emoji', fileName: new URL('./assets/emoji.jpg', import.meta.url).href}
        ],
        defaults: {
            renderer: "DefaultRenderer",
            scene: "MainScene"
        }
    }
);

export {}
