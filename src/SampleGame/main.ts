import TEntity from '@ecs/TEntity';
import Engine from '@engine';
import IGame from '@game/IGame';
import Scene from '@scenes/Scene';
import SceneManager from '@scenes/SceneManager';
import Particle from '@ecs/Components/Particle';

/* Game Class */
class SampleGame implements IGame{
    particleCount: number = 0;

    constructor(){

    };

    /* Preform Pre-loop operations */
    Start(){
        /* NOTE: CTX HASN'T BEEN DEFINED YET */
        // create a new scene called "SampleScene"
        var SampleScene: Scene = new Scene("SampleScene");
        
        // set the current scene
        SceneManager.setCurrentScene("SampleScene");

        // create a "Particles" parent entity for particles in game
        let Particles: TEntity = new TEntity("Particles");
        Particles.addComponent(new Particle());

        SampleScene.addObject(Particles);

        
    };

    Update(deltaTime: number): void{

    };

    Render(deltaTime: number){
        
    };
};

/* Make a new engine with this game */
var GameEngine: Engine = new Engine(new SampleGame());

// start engine
GameEngine.start();
