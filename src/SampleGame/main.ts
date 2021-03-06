import {
    Scene,
    SceneManager,
    Engine,
    Entity,
    Vector2,
} from '@GETS';


// import self-made scripts
import { ParticleSummoner } from './scripts/ParticleSummoner';
import { RotationBehavior } from './scripts/RotationBehavior';

/**
 * A simple sample game that renders a new particle in a random position after a certian amount of time
 */
const onStart1 = (): void => {
    // create a scene
    const SampleScene = new Scene("SampleScene");
    
    // create a parent class for all the particles that is invisible
    const Particles: Entity = new Entity("Particles", [], [new ParticleSummoner()]);

    // Particles Entity config
    Particles.visible = false;
    // Particles.relativeChildren = false;
    // Particles.Transform.position = new Vector2(200, 300);

    // add the particle into the scene
    SampleScene.addObject(Particles);

    // set this sample scene as the current scene
    SceneManager.setCurrentScene(SampleScene);
};


/* Make a new engine with this game */
var GameEngine: Engine = new Engine(800, 600, onStart1);

// start engine
GameEngine.start();
