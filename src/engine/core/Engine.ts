import { Lifecycle } from "./Lifecycle";
import { SceneManager } from "./scene/SceneManager";

export class Engine implements Lifecycle {
    private static _isInstance: boolean = false;
    private _onStart: () => void;

    constructor(onStart: () => void) {
        if (Engine._isInstance) {
            throw new Error("Engine instance already exists!");
        }
        
        this._onStart = onStart;
        this.start();

        Engine._isInstance = true;
    }

    public start(): void {
        this._onStart();
        SceneManager.getInstance().start();
    }
    
    public update(): void {
        SceneManager.getInstance().update();
    }

    public render(): void {
        SceneManager.getInstance().render();
    }
}
