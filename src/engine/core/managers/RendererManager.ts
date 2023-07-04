import Dictionary from "../../extra/Dictionary";
import { Renderer } from "../graphics/Renderer";
import { Lifecycle } from "../Lifecycle";
import { NameRegistrar } from "../helpers/NameRegistrar";

export class RendererManager extends NameRegistrar implements Lifecycle {
    private static _instance: RendererManager;

    private _gameRenderers: Dictionary<string, Renderer> = {}; // name: Renderer
    private _currentRenderer: string;

    private _loaded: boolean = false;

    get currentRenderer(): Renderer {
        return this.getRenderer(this._currentRenderer);
    }

    public static getInstance(): RendererManager {
        if (!this._instance) {
            this._instance = new RendererManager();
        }

        return this._instance;
    }

    private constructor() { super("RendererManager"); }

    public addRenderer(renderer: Renderer): void {
        super.registerName(renderer.name);
        this._gameRenderers[renderer.name] = renderer;

        if (this._loaded) renderer.load();
    }

    public getRenderer(name: string): Renderer {
        if (this._gameRenderers[name] === undefined) throw new Error(`Desired Renderer "${name}" not found.`)

        return this._gameRenderers[name];
    }

    public setCurrentRenderer(name: string): void {
        this._currentRenderer = name;

        window.gl = this.currentRenderer.gl;
    }

    public load(): void {
        if (this._loaded) return;

        Object.values(this._gameRenderers).forEach((r) => r.load());
        window.gl = this.currentRenderer.gl;

        this._loaded = true;
    }

    public update(): void {
        this.currentRenderer.update();
    }

    public render(): void {
        this.currentRenderer.render();
    }
}
