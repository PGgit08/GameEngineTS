import {
    Engine,
    DefaultRenderer
} from "../engine/GETS"

// Local Imports
import { MyScene } from "./scenes/MyScene";
import { default as ArmsAnimation } from "./assets/ArmsAnimation.json";

// Create a new Engine instance
new Engine(
    {
        renderers: [DefaultRenderer],
        scenes: [MyScene],
        
        textures: [
            {name: 'ArmsAnimation', fileName: new URL('./assets/ArmsAnimation.png', import.meta.url).href, configJson: ArmsAnimation},
            {name: 'Crosshair', fileName: new URL('./assets/Crosshair.png', import.meta.url).href},
            {name: 'FTEXT', fileName: new URL('./assets/f-texture.png', import.meta.url).href},
            {name: 'Background', fileName: new URL('./assets/background.png', import.meta.url).href}
        ],

        layers: ["Default", "Background"],

        defaults: {
            renderer: "DefaultRenderer",
            scene: "MyScene"
        }
    }
);

export {}
