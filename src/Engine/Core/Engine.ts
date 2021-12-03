import { Renderer } from "@renderer/Renderer";
import { SceneManager } from "@scenes/SceneManager";
import { Entity } from "@ecs/Entity";
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
    // the renderer associated with this Engine instance
    private _renderer: Renderer;

    // function passed in constructor, called on start
    private _onStart: () => void;
    
    // used for deltaTime calculation
    private _previousTime: number = 0;
    
    
    /**
     * Creates new Engine instance.
     * @param onStart Function called on Start of Engine lifecycle (default = empty)
     * @param width The width of the RenderView
     * @param height The height of the RenderView
     */
    constructor(width: number, height: number, onStart: () => void = () => {}){
        this._renderer = new Renderer(width, height);
        this._onStart = onStart;
    };

    /**
     * Same thing as SceneManager.CURRENT_SCENE.addObject(o)
     * @param o The Entity to be added to the Current scene
     */
    public addObject(o: Entity): void {
        SceneManager.CURRENT_SCENE.addObject(o);
    };

    /**
     * Pre-loop
     */
    public start(): void {
        // load the shader manager
        ShaderManager.Init();

        // and wait for it to finish loading
        this.loading();

        
        /**
         * Because asset loading does not exist yet,
         * onStart() is for debugging, and all entities
         * are created there, therefore game start is called here
         * (this can be seen as AssetManager.load)
         */
        this._onStart();

        // done loading, start needed things
        SceneManager.CURRENT_SCENE.start();

        // start of game loop after loading and starting procedures
        requestAnimationFrame(this.loop.bind(this));
    };

    /**
     * Wait for everything to finish loading.
     */
    private loading(): void {
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
    private loop(now: number): void {
        now *= 0.001; // convert to seconds
        Renderer.DeltaTime = now - this._previousTime;
        this._previousTime = now;

        this.update();
        this.render();

        requestAnimationFrame(this.loop.bind(this));
    };

    /**
     * Updates current scene and Game.
     * @param delta Time since last frame update!
     */
    private update(): void {
        // update function
        SceneManager.CURRENT_SCENE.update();
    };

    /**
     * Renders current scene and game(@class Renderer.renderWorld)
     */
    private render(): void {
        // rendering function
        this._renderer.renderWorld();
    };
};