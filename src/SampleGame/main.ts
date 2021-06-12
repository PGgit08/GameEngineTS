// importing from namespace not
// really working now
import {
    Scene,
    TEntity,
    SceneManager,
    Vector2,
    IGame,
    Engine,
    DrawComponent,
    Square2D
} from '@GETS';

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
        Particles.visible = false;

        // create a new "Particle" entity, give it components + behaviors, and add it to Particles parent
        const MainParticle: TEntity = new TEntity("t");
        const drawcomponent: DrawComponent = new DrawComponent();
        drawcomponent.setCurrentDrawing(new Square2D(100, 100));
        MainParticle.addComponent(drawcomponent);
        

        MainParticle.worldTransform.position = new Vector2(100, 200);
        MainParticle.worldTransform.rotation = 10;
        

        const OtherParticle: TEntity = new TEntity("o");
        const drawcomponent2: DrawComponent = new DrawComponent();
        drawcomponent2.setCurrentDrawing(new Square2D(100, 100));
        OtherParticle.addComponent(drawcomponent2);


        OtherParticle.localTransform.position = new Vector2(20, 0);

        Particles.addChild(MainParticle);
        MainParticle.addChild(OtherParticle);

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
