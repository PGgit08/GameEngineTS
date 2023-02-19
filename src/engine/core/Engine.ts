import { Lifecycle } from "./Lifecycle";
import { RendererManager } from "./managers/RendererManager";
import { SceneManager } from "./managers/SceneManager";

export class Engine implements Lifecycle {
    private static _isInstance: boolean = false;
    private _onStart: () => void;

    constructor(onStart: () => void) {
        if (Engine._isInstance) {
            throw new Error("Engine instance already exists!");
        }
        
        this._onStart = onStart;
        this.start();

        setInterval(this.cycle.bind(this), 500); // test loop

        Engine._isInstance = true;
    }

    private cycle(): void {
        this.update();
        this.render();
    }

    public start(): void {
        this._onStart();
        SceneManager.getInstance().start();
        RendererManager.getInstance().start();
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
