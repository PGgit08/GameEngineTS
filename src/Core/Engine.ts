import Renderer from "@renderer/Renderer";
import IGame from "@game/IGame";
import SceneManager from "@scenes/SceneManager";

// main engine class
export default class Engine{
    private renderer: Renderer;
    private game: IGame;

    private previousTime: number;

    public start(){
        // first thing called before loop
    };

    public loop(){
        // main game loop
        this.renderer.renderProps.deltaTime -= this.previousTime;
        let deltaTime: number = this.renderer.renderProps.deltaTime;

        this.update(deltaTime);
        this.render(deltaTime);

        this.previousTime = performance.now();
    };

    public update(delta:number){
        // update function
        SceneManager.CURRENT_SCENE.update();
        this.game.Update(delta);
    };

    public render(delta:number){
        // rendering function
        this.renderer.renderWorld(this.game);
    };
};