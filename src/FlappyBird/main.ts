import {
    Engine, SampleRenderer
} from "../engine/GETS";
import { MainScene } from "./scenes/MainScene";


Engine.Start({
    renderers: [SampleRenderer],
    scenes: [MainScene],

    textures: [
        {name: 'background', fileName: new URL('./assets/flappy_background.png', import.meta.url).href}
    ],

    layers: ["Default", "Background"],

    defaults: {
        scene: "MainScene",
        renderer: "SampleRenderer"
    }
})