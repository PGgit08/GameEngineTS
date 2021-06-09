import { Renderer } from "@renderer/Renderer";
import { IGame }from "@game/IGame";
import { SceneManager } from "@scenes/SceneManager";
import { RenderViewProps } from "@renderer/IViewProps";
import { TEntity } from "@ecs/TEntity";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { ShaderManager } from "@gl/ShaderManager";

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

        // load that shader manager
        ShaderManager.Init();

        /**
         * Because asset loading does not exist yet,
         * game Start() is for debugging, and all entities
         * are created there, therefore game start is called here
         */
        this.game.Start();

        // load everything in scenes
        SceneManager.CURRENT_SCENE.load();

        // and wait for it to finish loading
        this.loading();

        // done loading, start needed things
        // start the current scene
        SceneManager.CURRENT_SCENE.start();

        // start of game loop after loading and starting procedures
        this.loop();
    };

    /**
     * Wait for everything to finish loading.
     */
    private loading(){
        if(!SceneManager.CURRENT_SCENE.loaded){
            // start a recursive loop with requestAnimFrame
            requestAnimationFrame(this.loading.bind(this));
        };

        if(!ShaderManager.loaded){
            // same recursion
            requestAnimationFrame(this.loading.bind(this));
        };

        // means that everything has loaded, can kill recursive loop
        return;
    };

    /**
     * Game loop
     */
    private loop(){
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
    private update(delta:number){
        // update function
        SceneManager.CURRENT_SCENE.update(delta);
        this.game.Update(delta);
    };

    /**
     * Renders current scene and game(@class Renderer.renderWorld)
     */
    private render(){
        // rendering function
        this._renderer.renderWorld(this.game);
    };
};