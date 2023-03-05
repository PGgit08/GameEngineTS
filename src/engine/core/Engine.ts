import { EngineConfig } from "../extra/EngineConfig";
import { Input } from "../extra/Input";
import { Lifecycle } from "./Lifecycle";
import { RendererManager } from "./managers/RendererManager";
import { SceneManager } from "./managers/SceneManager";
import { ShaderManager } from "./managers/ShaderManager";

export class Engine implements Lifecycle {
    private static _isInstance: boolean = false;

    private _config: EngineConfig;

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

        setInterval(this.cycle.bind(this), 500); // test loop, to be changed to requestAnimationFrame in the future

        console.log(SceneManager.getInstance(), RendererManager.getInstance());

        Engine._isInstance = true;
    }

    private cycle(): void {
        this.update();
        this.render();
    }

    public load(): void {
        Input.addListeners();

        this._config.renderers.forEach((R) => new R());
        RendererManager.getInstance().load();

        ShaderManager.getInstance().load();

        this._config.scenes.forEach((S) => new S());
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
}
