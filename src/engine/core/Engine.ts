import { EngineConfig } from "../extra/EngineConfig";
import { Input } from "../extra/Input";
import { Lifecycle } from "./Lifecycle";
import { RendererManager } from "./managers/RendererManager";
import { SceneManager } from "./managers/SceneManager";
import { ShaderManager } from "./managers/ShaderManager";

export class Engine implements Lifecycle {
    private static _isInstance: boolean = false;
    private _onStart: () => void;
    private _onLoad: () => void;
    private _engineConfig: EngineConfig;

    /**
     * Creates the single Engine instance.
     * @param onLoad Simulates ASSET LOADING, to be REMOVED later. 
     * @param onStart Function that is called on start, once everything has been loaded.
     */
    constructor(engineConfig: EngineConfig, onLoad: () => void, onStart: () => void) {
        if (Engine._isInstance) {
            throw new Error("Engine instance already exists!");
        }
        
        this._onLoad = onLoad;
        this._onStart = onStart;
        this._engineConfig = engineConfig;

        this.load();
        this.start();

        setInterval(this.cycle.bind(this), 20); // test loop, to be changed to requestAnimationFrame in the future

        // console.log(SceneManager.getInstance(), RendererManager.getInstance());

        Engine._isInstance = true;
    }

    private cycle(): void {
        this.update();
        this.render();
    }

    public load(): void {
        // this._onLoad(); // SIMULATE ASSET LOADING (for now)

        // ENGINE CONFIG TESTING
        Input.addListeners();

        this._engineConfig.renderers.forEach((R) => new R());
        RendererManager.getInstance().load();

        ShaderManager.getInstance().load();

        this._engineConfig.scenes.forEach((S) => new S());
        SceneManager.getInstance().load();
    }

    public start(): void {
        RendererManager.getInstance().start();
        SceneManager.getInstance().start();
        this._onStart();
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
