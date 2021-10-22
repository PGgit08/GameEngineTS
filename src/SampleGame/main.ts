// importing from namespace not
// really working now
import {
    Scene,
    TEntity,
    SceneManager,
    Vector2,
    IGame,
    Engine,
    Particle
} from '@GETS';
import { ColorChanger } from './scripts/ColorChanger';


/* Game Class */
class SampleGame implements IGame {
    // sceneCounter: number = 0;

    constructor(){

    };

    /* Preform Pre-loop operations */
    Start(): void {
        /* NOTE: CTX HASN'T BEEN DEFINED YET */

        /* 
        NOTE: This game data will be loaded from an asset,
        in the Engine's start() method,
        however for now it is loaded here
        */
    
        // make a scene with the name "SampleScene"
        const SampleScene: Scene = new Scene("SampleScene");
        
        // create a "Particles" parent entity for particles in game
        const Particles: TEntity = new TEntity("Particles");
        Particles.visible = false;

        // create particle entities
        const MainParticle = new Particle();

        // set their positions
        MainParticle.Transform.position = new Vector2(200, 300);
        

        Particles.addChild(MainParticle);

        // add "Particles" parent into sample scene
        SampleScene.addObject(Particles);


        // set the current scene
        SceneManager.setCurrentScene("SampleScene");
    };

    Update(): void {
        
    };

    Render(): void {
        
    };
};

/* Make a new engine with this game */
var GameEngine: Engine = new Engine(new SampleGame(), 800, 600);

// start engine
GameEngine.start();
