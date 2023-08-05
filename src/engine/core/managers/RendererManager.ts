import Dictionary from "../../types/Dictionary";
import { Renderer } from "../graphics/Renderer";
import { Lifecycle } from "../Lifecycle";
import { NameRegistrar } from "../helpers/NameRegistrar";

/**
 * @classdesc
 * A NameRegistrar singleton class that holds {@link Renderer} classes. Renderers are automatically added to this manager when they are
 * created. This manager can only render on a single Renderer at once: the {@link currentRenderer}. 
 * The manager implements the {@link Lifecycle} interface, and during {@link load} it loads all the Renderers added to it, while during
 * {@link update} and {@link render} it only calls the Lifecycle methods on the currentRenderer.
 * 
 * @class RendererManager
 * @extends NameRegistrar
 * @implements {Lifecycle}
 * 
 * @hideconstructor
 */
export class RendererManager extends NameRegistrar implements Lifecycle {
    private static _instance: RendererManager;

    private _gameRenderers: Dictionary<string, Renderer> = {}; // name: Renderer
    private _currentRenderer: string;

    private _loaded: boolean = false;

    /** @returns {Renderer} The current Renderer of this manager. */
    get currentRenderer(): Renderer {
        return this.getRenderer(this._currentRenderer);
    }

    /**
     * @returns {RendererManager} The single instance of the {@link RendererManager}. 
     */
    public static getInstance(): RendererManager {
        if (!this._instance) {
            this._instance = new RendererManager();
        }

        return this._instance;
    }

    private constructor() { super("RendererManager"); }

    /**
     * Adds a Renderer to this manager. If this manager has been loaded and the added Renderer has not been loaded, then it will
     * automatically load the added Renderer.
     * 
     * @param {Renderer} renderer - The Renderer being added.
     */
    public addRenderer(renderer: Renderer): void {
        super.registerName(renderer.name);
        this._gameRenderers[renderer.name] = renderer;

        if (this._loaded) renderer.load();
    }

    /**
     * Gets a Renderer from this manager by its name.
     * 
     * @param {string} name - The name of the Renderer.
     */
    public getRenderer(name: string): Renderer {
        if (this._gameRenderers[name] === undefined) throw new Error(`Desired Renderer "${name}" not found.`)

        return this._gameRenderers[name];
    }

    /**
     * Sets the current Renderer of this manager by its name. The Renderer must already exist in this manager.
     * 
     * @param {string} name - The name of the Renderer.
     */
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

    public unload(): void {
        if (!this._loaded) return;

        Object.values(this._gameRenderers).forEach((r) => r.unload());
        window.gl = null;

        this._loaded = false;
    }
}
