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
    Color,
    Entity
} from '@GETS';
import { RotationBehavior } from './scripts/RotationBehavior';

// make entities on start
const onStart = (): void => {
    // create a scene
    const SampleScene = new Scene("SampleScene");
    
    // create a parent class for all the particles that is invisible
    const Particles: Entity = new Entity("Particles", [], [new RotationBehavior()]);

    // Particles config
    Particles.visible = false;
    // Particles.relativeChildren = false;

    // create a particle
    const Particle1: Particle = new Particle();
    (Particle1.getComponent(RenderComponent).mesh.material as ColorMaterial).tint = Color.GREEN;

    // set the config of the particle
    Particle1.Transform.position = new Vector2(200, 300);

    // add all Particles into the parent particle class
    Particles.addChild(Particle1);

    // add the particle into the scene
    SampleScene.addObject(Particles);

    // set this sample scene as the current scene
    SceneManager.setCurrentScene(SampleScene);
};

/* Make a new engine with this game */
var GameEngine: Engine = new Engine(800, 600, onStart);

// start engine
GameEngine.start();
