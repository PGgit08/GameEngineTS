import {
    Engine, SampleRenderer
} from "../engine/GETS";
import { MainScene } from "./scenes/MainScene";


Engine.Start({
    renderers: [SampleRenderer],
    scenes: [MainScene],

    textures: [
        {name: 'background', fileName: new URL('./assets/flappy_background.png', import.meta.url).href},
        {name: 'ground', fileName: new URL('./assets/flappy_ground.png', import.meta.url).href},
        {name: 'column', fileName: new URL('./assets/flappy_column.png', import.meta.url).href},
        {name: 'bird', fileName: new URL('./assets/bird2.jpg', import.meta.url).href}
    ],

    layers: ["Default", "Ground", "Background"],

    defaults: {
        scene: "MainScene",
        renderer: "SampleRenderer"
    }
})