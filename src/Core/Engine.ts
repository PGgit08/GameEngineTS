import Renderer from "@renderer/Renderer";
import IGame from "@game/IGame";
import SceneManager from "@scenes/SceneManager";
import { RenderViewProps } from "@renderer/IViewProps";

// main engine class
export default class Engine{
    private renderer: Renderer;
    private game: IGame;

    private previousTime: number;

    constructor(game:IGame, viewConfig: RenderViewProps){
        // basic constructor called
        // when engine created
        this.renderer = new Renderer(
            viewConfig,
            {deltaTime: 0}
        );

        this.game = game;
    };

    public start(){
        // first thing called before loop
        this.previousTime = performance.now();
        this.renderer.renderProps.deltaTime -= this.previousTime;

        // run pre-loop start methods
        this.game.Start();
        SceneManager.CURRENT_SCENE.start();
        this.loop();
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