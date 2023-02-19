import Dictionary from "../../extra/Dictionary";
import { Renderer } from "../graphics/Renderer";
import { Lifecycle } from "../Lifecycle";
import { SampleRenderer } from "../samples/SampleRenderer";

export class RendererManager implements Lifecycle {
    private static _instance: RendererManager;

    private _gameRenderers: Dictionary<string, Renderer> = {}; // name: Renderer
    private _currentRenderer: Renderer;

    get currentRenderer(): Renderer {
        return this._currentRenderer;
    }

    public static getInstance(): RendererManager {
        if (!this._instance) {
            this._instance = new RendererManager();
            this._instance.setCurrentRenderer(new SampleRenderer()); // create this renderer by default
        }

        return this._instance;
    }

    private constructor() {}

    public addRenderer(renderer: Renderer): void {
        this._gameRenderers[renderer.name] = renderer;
    }

    public getRenderer(name: string): Renderer {
        return this._gameRenderers[name];
    }

    public setCurrentRenderer(renderer: Renderer): void {
        this.addRenderer(renderer);
        this._currentRenderer = renderer;
    }

    public setCurrentRendererByName(name: string): void {
        this._currentRenderer = this.getRenderer(name);
    }

    public start(): void {
        this._currentRenderer.start();
    }

    public update(): void {
        this._currentRenderer.update();
    }

    public render(): void {
        this._currentRenderer.render();
    }
}
