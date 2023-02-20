import { Renderer } from "../engine/core/graphics/Renderer";
import { Scene } from "../engine/core/scene/Scene";
import {
    Engine, 
    RendererManager, 
    SampleRenderer, 
    SampleScene, 
    SceneManager
} from "../engine/GETS"

// THIS IS USED TO SIMULATE ASSET LOADING IN THE LOADING PERIOD 
const onLoad = (): void => {
    console.log("onLoad() from main.ts! (TESTING)");

    // FIRST look for renderers and load them
    const renderer: Renderer = new SampleRenderer();
    RendererManager.getInstance().setCurrentRenderer(renderer);
    RendererManager.getInstance().load();


    // NEXT look for scenes and load them
    const scene: Scene = new SampleScene();
    SceneManager.getInstance().setCurrentScene(scene);
    SceneManager.getInstance().load();
} 

new Engine(
    onLoad,
    (): void => { console.log("onStart() from main.ts!"); console.log(gl); }
);

export {}
