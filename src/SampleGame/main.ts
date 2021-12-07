// importing from namespace not
// really working now
import {
    Scene,
    SceneManager,
    Vector2,
    Engine,
    Particle,
    RenderComponent,
    ColorMaterial,
    Color
} from '@GETS';
import { ColorChanger } from './scripts/ColorChanger';

// make entities on start
const onStart = (): void => {
    // create a scene
    const SampleScene = new Scene("SampleScene");
    
    // create a particle
    const Particle1: Particle = new Particle();
    Particle1.getComponent(RenderComponent).mesh.material

    // set the config of the particle
    Particle1.Transform.position = new Vector2(200, 300);

    // add the particle into the scene
    SampleScene.addObject(Particle1);

    // set this sample scene as the current scene
    SceneManager.setCurrentScene(SampleScene);
};

/* Make a new engine with this game */
var GameEngine: Engine = new Engine(800, 600, onStart);

// start engine
GameEngine.start();
