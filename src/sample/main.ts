import {
    Engine,
} from "../engine/GETS"

const engine: Engine = new Engine(
    (): void => { console.log("Hello World!") }
);

engine.update();
engine.render();

export {}
