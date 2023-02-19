import {
    Engine,
} from "../engine/GETS"

const engine: Engine = new Engine(
    (): void => { console.log("onStart from main.ts!") }
);

engine.update();
engine.render();

export {}
