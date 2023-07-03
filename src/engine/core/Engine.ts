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

export class Engine implements Lifecycle {
    private static _isInstance: boolean = false;

    private _config: EngineConfig;

    private _loopId: number;

    /**
     * Creates the single Engine instance.
     * @param config The EngineConfig for the Engine instance.
     */
    constructor(config: EngineConfig) {
        if (Engine._isInstance) {
            throw new Error("Engine instance already exists!");
        }
        
        this._config = config;

        this.load();

        this._loopId = requestAnimationFrame(this.cycle.bind(this));

        console.log(SceneManager.getInstance(), RendererManager.getInstance());

        Engine._isInstance = true;
    }

    private cycle(now: number): void {
        Time.addLastFrameRender(now * .001);

        this.update();
        this.render();

        requestAnimationFrame(this.cycle.bind(this));
    }

    public load(): void {
        Input.addListeners();
        
        if (this._config.layers !== undefined) Layers.setGameLayers(this._config.layers);

        this._config.renderers.forEach((R) => new R());
        
        RendererManager.getInstance().setCurrentRenderer(this._config.defaults.renderer);
        RendererManager.getInstance().load();

        new StandardShader();
        
        ShaderManager.getInstance().load();

        if (this._config.textures !== undefined) this._config.textures.forEach((t) => new Texture(t.name, t.fileName, t.configJson));
        new Texture('WHITE');

        TextureManager.getInstance().load();

        this._config.scenes.forEach((S) => new S());
        SceneManager.getInstance().setCurrentScene(this._config.defaults.scene);

        // load everything in scenes after creating instances
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

    // TODO: Add this later to Lifecycle interface
    public end(): void {
        cancelAnimationFrame(this._loopId);
    }
}
