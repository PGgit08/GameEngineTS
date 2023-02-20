import {
    Engine,
} from "../engine/GETS"

new Engine(
    (): void => { console.log("onStart() from main.ts!") }
);

export {}
