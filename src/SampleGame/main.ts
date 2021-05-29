import * as gts from '@GETS';

/* Game Class */
class SampleGame implements GETS.IGame{
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
        const SampleScene: gts.Scene = new gts.Scene("SampleScene");
        
        // create a "Particles" parent entity for particles in game
        const Particles: gts.TEntity = new gts.TEntity("Particles");

        // create a new "Particle" entity, give it components + behaviors, and add it to Particles parent
        const MainParticle: gts.Particle = new gts.Particle();
        const OtherParticle: gts.Particle = new gts.Particle();

        MainParticle.transform.position = new gts.Vector2(100, 200);
        OtherParticle.transform.position = new gts.Vector2(300, 400);

        Particles.addChild(MainParticle);
        Particles.addChild(OtherParticle);

        // add all needed objects into the scene
        SampleScene.addObject(Particles);

        // set the current scene
        gts.SceneManager.setCurrentScene("SampleScene");
    };

    Update(deltaTime: number): void{
        
    };

    Render(deltaTime: number){
        
    };
};

/* Make a new engine with this game */
var GameEngine: gts.Engine = new gts.Engine(new SampleGame(), {
    height: 600,
    width: 800
});

// start engine
GameEngine.start();
