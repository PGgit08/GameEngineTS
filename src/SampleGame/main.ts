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
    Triangle2D,
    Rect2D,
    RotationBehavior
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

        // create a single particle snippet
        const MainParticle: TEntity = new TEntity("mp");
        
        const dc: DrawComponent = new DrawComponent();
        dc.setCurrentDrawing(new Triangle2D(50, 50));
        
        MainParticle.addComponent(dc);
        // MainParticle.addBehavior(new RotationBehavior());
        
        
        // more particles
        const Particle1: TEntity = new TEntity("p1");

        const dc1: DrawComponent = new DrawComponent();
        dc1.setCurrentDrawing(new Rect2D(50, 50));


        Particle1.addComponent(dc1);
        // Particle1.addBehavior(new RotationBehavior());


        const Particle2: TEntity = new TEntity("p2");

        const dc2: DrawComponent = new DrawComponent();
        dc2.setCurrentDrawing(new Rect2D(50, 50));

        Particle2.addComponent(dc2);


        MainParticle.worldTransform.position = new Vector2(300, 300);
        Particle1.localTransform.position = new Vector2(100, 0);
        Particle2.localTransform.position = new Vector2(150, 0);

        Particle1.addChild(Particle2);
        MainParticle.addChild(Particle1);
        Particles.addChild(MainParticle);

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
