import { Renderer } from "@renderer/Renderer";
import { IGame }from "@game/IGame";
import { SceneManager } from "@scenes/SceneManager";
import { RenderViewProps } from "@renderer/IViewProps";
import { TEntity } from "@ecs/TEntity";
import { GLMatrix4 } from "@gl/GLMatrix4";

/**
 * Main Engine class
 * Handles RenderView
 * Loops
 * Rendering
 * And ETC.
 */
export class Engine{
    private _renderer: Renderer;
    private game: IGame;

    private previousTime: number;

    /**
     * Creates new Engine instance.
     * @param game The IGame for the engine to work with.
     * @param viewConfig RenderView physical properties
     */
    constructor(game:IGame, viewConfig: RenderViewProps){
        // basic constructor called
        // when engine created
        this._renderer = new Renderer(
            viewConfig,
            {
                deltaTime: 0,
                vMatrix: GLMatrix4.identity(),
                pMatrix: GLMatrix4.projection(viewConfig.width, viewConfig.height)
            }
        );

        this.game = game;
    };

    /**
     * Same thing as SceneManager.CURRENT_SCENE.addObject(o)
     * @param o The Entity to be added to the Current scene
     */
    public addObject(o: TEntity){
        SceneManager.CURRENT_SCENE.addObject(o);
    };

    /**
     * Pre-loop
     */
    public start(){
        // first thing called before loop
        this.previousTime = performance.now();
        Renderer.renderProps.deltaTime -= this.previousTime;

        // run pre-loop start methods
        this.game.Start();
        SceneManager.CURRENT_SCENE.start();
        this.loop();
    };

    /**
     * Game loop
     */
    public loop(){
        // main game loop
        Renderer.renderProps.deltaTime -= this.previousTime;
        let deltaTime: number = Renderer.renderProps.deltaTime;

        this.update(deltaTime);
        this.render();

        this.previousTime = performance.now();

        requestAnimationFrame(this.loop.bind(this));
    };

    /**
     * Updates current scene and Game.
     * @param delta Time since last frame update!
     */
    public update(delta:number){
        // update function
        SceneManager.CURRENT_SCENE.update(delta);
        this.game.Update(delta);
    };

    /**
     * Renders current scene and game(@class Renderer.renderWorld)
     */
    public render(){
        // rendering function
        this._renderer.renderWorld(this.game);
    };
};