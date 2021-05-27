import TEntity from '@ecs/TEntity';
import Engine from '@engine';
import IGame from '@game/IGame';
import Vector2 from '@physics/Vector';
import Scene from '@scenes/Scene';
import SceneManager from '@scenes/SceneManager';

// get premade particle entity
import Particle from 'Core/Particle/Particle';

/* Game Class */
class SampleGame implements IGame{
    // sceneCounter: number = 0;

    constructor(){

    };

    /* Preform Pre-loop operations */
    Start(){
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

        // create a new "Particle" entity, give it components + behaviors, and add it to Particles parent
        const MainParticle: Particle = new Particle();
        const OtherParticle: Particle = new Particle();

        MainParticle.transform.position = new Vector2(100, 200);
        OtherParticle.transform.position = new Vector2(300, 400);

        Particles.addChild(MainParticle);
        Particles.addChild(OtherParticle);

        console.log(Particles.children);

        // add all needed objects into the scene
        SampleScene.addObject(Particles);

        // set the current scene
        SceneManager.setCurrentScene("SampleScene");
    };

    Update(deltaTime: number): void{
        
    };

    Render(deltaTime: number){
        
    };
};

/* Make a new engine with this game */
var GameEngine: Engine = new Engine(new SampleGame(), {
    height: 600,
    width: 800
});

// start engine
GameEngine.start();
