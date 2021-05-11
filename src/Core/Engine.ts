import Renderer from "@renderer/Renderer";
import IGame from "@game/IGame";
import SceneManager from "@scenes/SceneManager";

// main engine class
export default class Engine{
    private renderer: Renderer;
    private game: IGame;

    private previousTime: number;

    constructor(game:IGame){
        // basic constructor called
        // when engine created
        this.renderer = new Renderer(
            {width:"100%", height:"100%"},
            {deltaTime: 0}
        );

        this.game = game;
    };

    public start(){
        // first thing called before loop
        this.previousTime = performance.now();
        this.renderer.renderProps.deltaTime -= this.previousTime;

        this.game.Start();
    };

    public loop(){
        // main game loop
        this.renderer.renderProps.deltaTime -= this.previousTime;
        let deltaTime: number = this.renderer.renderProps.deltaTime;

        this.update(deltaTime);
        this.render();

        this.previousTime = performance.now();

        requestAnimationFrame(this.loop.bind(this));
    };

    public update(delta:number){
        // update function
        SceneManager.CURRENT_SCENE.update(delta);
        this.game.Update(delta);
    };

    public render(){
        // rendering function
        this.renderer.renderWorld(this.game);
    };
};