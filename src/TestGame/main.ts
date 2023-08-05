import {
    Engine,
    SampleRenderer
} from "../engine/GETS"

// Local Imports
import { MyScene } from "./scenes/MyScene";
import { default as ArmsAnimation } from "./assets/ArmsAnimation.json";

// Create a new Engine instance
Engine.Start(
    {
        renderers: [SampleRenderer],
        scenes: [MyScene],
        
        textures: [
            {name: 'ArmsAnimation', fileName: new URL('./assets/ArmsAnimation.png', import.meta.url).href, configJson: ArmsAnimation},
            {name: 'Crosshair', fileName: new URL('./assets/Crosshair.png', import.meta.url).href},
            {name: 'FTEXT', fileName: new URL('./assets/f-texture.png', import.meta.url).href},
            {name: 'Background', fileName: new URL('./assets/background.png', import.meta.url).href}
        ],

        layers: ["Default", "Background"],

        defaults: {
            renderer: "SampleRenderer",
            scene: "MyScene"
        }
    }
);

// Engine.End();

export {}
