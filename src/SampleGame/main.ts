/**
 * A simple sample game that renders a particle in a random position 
 */
import {
    Scene,
    SceneManager,
    Engine,
    Entity,
} from '@GETS';

// import self-made scripts
import { ParticleSummoner } from './scripts/ParticleSummoner';
import { RotationBehavior } from './scripts/RotationBehavior';

// make entities on start
const onStart = (): void => {
    // create a scene
    const SampleScene = new Scene("SampleScene");
    
    // create a parent class for all the particles that is invisible
    const Particles: Entity = new Entity("Particles", [], [new ParticleSummoner(), new RotationBehavior(10)]);

    // Particles config
    Particles.visible = false;
    // Particles.relativeChildren = false;
    // Particles.Transform.position = new Vector2(200, 300);

    // add the particle into the scene
    SampleScene.addObject(Particles);

    // set this sample scene as the current scene
    SceneManager.setCurrentScene(SampleScene);
};

/* Make a new engine with this game */
var GameEngine: Engine = new Engine(800, 600, onStart);

// start engine
GameEngine.start();
