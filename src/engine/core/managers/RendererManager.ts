import Dictionary from "../../extra/Dictionary";
import { Renderer } from "../graphics/Renderer";
import { Lifecycle } from "../Lifecycle";
import { Manager } from "./Manager";

export class RendererManager extends Manager implements Lifecycle {
    private static _instance: RendererManager;

    private _gameRenderers: Dictionary<string, Renderer> = {}; // name: Renderer
    private _currentRenderer: Renderer;

    get currentRenderer(): Renderer {
        return this._currentRenderer;
    }

    public static getInstance(): RendererManager {
        if (!this._instance) {
            this._instance = new RendererManager();
        }

        return this._instance;
    }

    private constructor() { super(); }

    public addRenderer(renderer: Renderer): void {
        super.registerName(renderer.name);
        this._gameRenderers[renderer.name] = renderer;
    }

    public getRenderer(name: string): Renderer {
        return this._gameRenderers[name];
    }

    public setCurrentRenderer(renderer: Renderer): void {
        this._currentRenderer = renderer;
        window.gl = renderer.gl;
    }

    public setCurrentRendererByName(name: string): void {
        const renderer: Renderer = this.getRenderer(name);

        this._currentRenderer = renderer;
        window.gl = renderer.gl;
    }

    public load(): void {
        Object.values(this._gameRenderers).forEach((r) => r.load());
        window.gl = this._currentRenderer.gl;
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
