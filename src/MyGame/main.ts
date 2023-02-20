import {
    Engine, 
    RendererManager, 
    SampleRenderer, 
    SampleScene, 
    SceneManager
} from "../engine/GETS"

// THIS IS USED TO SIMULATE ASSET LOADING IN THE LOADING PERIOD 
const onLoad = (): void => {
    console.log("onLoad() from Main.ts! (TESTING)");

    SceneManager.getInstance().setCurrentScene(new SampleScene());
    RendererManager.getInstance().setCurrentRenderer(new SampleRenderer());
} 

new Engine(
    onLoad,
    (): void => { console.log("onStart() from main.ts!"); console.log(window.gl);}
);

export {}
