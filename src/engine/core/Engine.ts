import { EngineConfig } from "../extra/EngineConfig";
import { Input } from "../extra/Input";
import { Time } from "../extra/Time";
import { Texture } from "../GETS";
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
        this.start();

        // setInterval(this.cycle.bind(this), 30); // test loop
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

        this._config.renderers.forEach((R) => new R());
        RendererManager.getInstance().setCurrentRendererByName(this._config.defaults.renderer);
        RendererManager.getInstance().load();

        ShaderManager.getInstance().load();

        if (this._config.textures !== undefined) { this._config.textures.forEach((t) => { new Texture(t.name, t.fileName, t.configJson); }) }
        TextureManager.getInstance().load();

        this._config.scenes.forEach((S) => new S());
        SceneManager.getInstance().setCurrentSceneByName(this._config.defaults.scene);
        SceneManager.getInstance().load();
    }

    public start(): void {
        RendererManager.getInstance().start();
        SceneManager.getInstance().start();
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
