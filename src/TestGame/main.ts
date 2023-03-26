import {
    Engine,
    DefaultRenderer
} from "../engine/GETS"

// Local Imports
import { MyScene } from "./scenes/MyScene";
import { default as testJson } from "./assets/testJson.json";

// Create a new Engine instance
new Engine(
    {
        renderers: [DefaultRenderer],
        scenes: [MyScene],
        textures: [
            // {name: 'f-texture', fileName: new URL('./assets/f-texture.png', import.meta.url).href},
            // {name: 'emoji', fileName: new URL('./assets/emoji.jpg', import.meta.url).href},
            // {name: 'sprite1', fileName: new URL('./assets/Sprite1.png', import.meta.url).href},
            {name: 'testJson', fileName: new URL('./assets/testJson.png', import.meta.url).href, configJson: testJson}
        ],
        defaults: {
            renderer: "DefaultRenderer",
            scene: "MyScene"
        }
    }
);

export {}
