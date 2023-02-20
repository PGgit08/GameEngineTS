import { Lifecycle } from "./Lifecycle";
import { RendererManager } from "./managers/RendererManager";
import { SceneManager } from "./managers/SceneManager";

export class Engine implements Lifecycle {
    private static _isInstance: boolean = false;
    private _onStart: () => void;
    private _onLoad: () => void;

    /**
     * Creates the single Engine instance.
     * @param onLoad Simulates ASSET LOADING, to be REMOVED later. 
     * @param onStart Function that is called on start, once everything has been loaded.
     */
    constructor(onLoad: () => void, onStart: () => void) {
        if (Engine._isInstance) {
            throw new Error("Engine instance already exists!");
        }
        
        this._onLoad = onLoad;
        this._onStart = onStart;

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
        this._onLoad(); // SIMULATE ASSET LOADING
        RendererManager.getInstance().load();
        SceneManager.getInstance().load();
    }

    public start(): void {
        SceneManager.getInstance().start();
        RendererManager.getInstance().start();
        this._onStart();
    }
    
    public update(): void {
        SceneManager.getInstance().update();
        RendererManager.getInstance().update();
    }

    public render(): void {
        SceneManager.getInstance().render();
        RendererManager.getInstance().render();
    }
}
