import { EngineConfig } from "./config/EngineConfig";
import { Input } from "./helpers/Input";
import { Time } from "./helpers/Time";
import { Texture } from "../GETS";
import { StandardShader } from "./gl/shader/StandardShader";
import { Layers } from "./graphics/sprite/Layers";
import { Lifecycle } from "./Lifecycle";
import { RendererManager } from "./managers/RendererManager";
import { SceneManager } from "./managers/SceneManager";
import { ShaderManager } from "./managers/ShaderManager";
import { TextureManager } from "./managers/TextureManager";
import { GameObject } from "./ecs/GameObject";

/**
 * @classdesc 
 * The main class of the game that calls the Lifecycle methods on all objects. Only a single instance of this class exists (Singleton).
 * The Engine is automatically started after its initialization.
 * 
 * @class Engine
 * @extends GameObject
 * @implements {Lifecycle}
 * 
 * @hideconstructor
 */
export class Engine extends GameObject implements Lifecycle {
    private static _instance: Engine = null;

    private _loopId: number;

    private _config: EngineConfig;

    /**
     * Creates a new Engine instance and starts it.
     * 
     * @static 
     * 
     * @param {EngineConfig} config - The config for the Engine instance.
     */
    public static Start(config: EngineConfig): void {
        if (Engine._instance) throw new Error("Engine instance already exists.");

        Engine._instance = new Engine(config);
    }

    /**
     * Ends the currently running Engine instance.
     * 
     * @static
     */
    public static End(): void {
        if (!Engine._instance) throw new Error("No Engine instance exists.");

        this._instance.unload();

        throw '--- ENGINE INSTANCE ENDED ---'; // use throw to interrupt everything
    }


    private constructor(config: EngineConfig) {
        super("Engine");

        this._config = config;

        this.load();

        this._loopId = requestAnimationFrame(this.cycle.bind(this));

        console.log('--- ENGINE INSTANCE STARTED ---', SceneManager.getInstance(), RendererManager.getInstance());
    }

    private cycle(now: number): void {
        Time.AddLastFrameRender(now * .001);

        this.update();
        this.render();

        requestAnimationFrame(this.cycle.bind(this));
    }

    public load(): void {
        Input.AddListeners();
        
        if (this._config.layers !== undefined) Layers.SetGameLayers(this._config.layers);

        if (this._config.renderers.length === 0) throw new Error("No Renderers exist, please supply Engine with Renderers.");
        this._config.renderers.forEach((R) => new R());
        RendererManager.getInstance().setCurrentRenderer(this._config.defaults.renderer);
        RendererManager.getInstance().load();

        if (this._config.shaders !== undefined) this._config.shaders.forEach((S) => new S());
        new StandardShader();
        ShaderManager.getInstance().load();

        if (this._config.textures !== undefined) this._config.textures.forEach((t) => new Texture(t.name, t.fileName, t.configJson));
        new Texture('WHITE');
        TextureManager.getInstance().load();

        if (this._config.scenes.length === 0) throw new Error("No Scenes exist, please supply Engine with Scenes.");
        this._config.scenes.forEach((S) => new S());
        SceneManager.getInstance().setCurrentScene(this._config.defaults.scene);
        SceneManager.getInstance().load();
    }
    
    public update(): void {
        RendererManager.getInstance().update();
        SceneManager.getInstance().update();
    }

    public render(): void {
        RendererManager.getInstance().render();
        SceneManager.getInstance().render();
    }

    public unload(): void {
        // unload everything in reverse
        SceneManager.getInstance().unload();
        TextureManager.getInstance().unload();
        ShaderManager.getInstance().unload();
        RendererManager.getInstance().unload();

        Input.RemoveListeners();

        cancelAnimationFrame(this._loopId);
    }
}
