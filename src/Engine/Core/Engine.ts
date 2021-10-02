import { Renderer } from "@renderer/Renderer";
import { IGame }from "@game/IGame";
import { SceneManager } from "@scenes/SceneManager";
import { RenderViewProps } from "@renderer/IViewProps";
import { TEntity } from "@ecs/TEntity";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { ShaderManager } from "@graphics/ShaderManager";

/**
 * Main Engine class
 * Handles RenderView
 * Loops
 * Rendering
 * And ETC.
 */
export class Engine {
    private _renderer: Renderer;
    private game: IGame;

    private _previousTime: number = 0;
    
    
    /**
     * Creates new Engine instance.
     * @param game The IGame for the engine to work with.
     * @param viewConfig RenderView physical properties
     */
    constructor(game: IGame, viewConfig: RenderViewProps){
        // basic constructor called
        // when engine created
        this._renderer = new Renderer(viewConfig);

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
        // load the shader manager
        ShaderManager.Init();

        /**
         * Because asset loading does not exist yet,
         * game Start() is for debugging, and all entities
         * are created there, therefore game start is called here
         * (this can be seen as AssetManager.load)
         */
        this.game.Start();

        // load everything in scenes
        SceneManager.CURRENT_SCENE.load();

        // and wait for it to finish loading
        this.loading();

        // done loading, start needed things
        SceneManager.CURRENT_SCENE.start();

        // start of game loop after loading and starting procedures
        requestAnimationFrame(this.loop.bind(this));
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
        console.log("done loading");
        return;
    };

    /**
     * Game loop
     */
    private loop(){
        // main game loop

        let delta = (performance.now() - this._previousTime) / 1000;

        this.update();
        this.render();

        this._previousTime = performance.now();

        requestAnimationFrame(this.loop.bind(this));
    };

    /**
     * Updates current scene and Game.
     * @param delta Time since last frame update!
     */
    private update(){
        // update function
        SceneManager.CURRENT_SCENE.update();
        this.game.Update();
    };

    /**
     * Renders current scene and game(@class Renderer.renderWorld)
     */
    private render(){
        // rendering function
        this._renderer.renderWorld(this.game);
    };
};