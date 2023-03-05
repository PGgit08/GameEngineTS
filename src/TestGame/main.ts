import {
    Engine,
    DefaultRenderer
} from "../engine/GETS"

// Local Imports
import { MyScene } from "./scenes/MyScene";

// Create a new Engine instance
new Engine(
    {
        renderers: [DefaultRenderer],
        scenes: [MyScene]
    }
);
