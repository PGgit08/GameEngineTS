import { Lifecycle } from "../Lifecycle";
import Dictionary from "../../types/Dictionary";
import { Scene } from "../ecs/Scene";
import { NameRegistrar } from "../helpers/NameRegistrar";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

/**
 * @classdesc
 * A NameRegistrar singleton that holds {@link Scene} classes. Scenes are automatically added to this manager when they are created.
 * This manager can only run a single Scene at once: the {@link currentScene}. The manager implements the {@link Lifecycle} interface,
 * and during {@link load} it loads all the Scenes added to it, while during {@link update} and {@link render} 
 * it only calls the Lifecycle methods on the currentScene.
 * 
 * @class SceneManager
 * @extends NameRegistrar
 * @implements {Lifecycle}
 * 
 * @hideconstructor
 */
export class SceneManager extends NameRegistrar implements Lifecycle {
    private static _instance: SceneManager;

    private _gameScenes: Dictionary<string, Scene> = {}; // name: Scene
    private _currentScene: string;

    private _SCENE_CHANGE_EVENT: Event<null> = new Event(Events.SCENE_CHANGE);
    
    private _loaded: boolean = false;

    /** @returns {Scene} The current Scene of this manager. */
    get currentScene(): Scene {
        return this.getScene(this._currentScene);
    }

    /**
     * @returns {SceneManager} The single instance of the {@link SceneManager}. 
     */
    public static getInstance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }

        return this._instance;
    }

    private constructor() { super("SceneManager"); }

    /**
     * Adds a Scene to this manager. If this manager has been loaded and the added Scene has not been loaded, then it will
     * automatically load the added Scene.
     * 
     * @param {Scene} scene - The Scene being added. 
     */
    public addScene(scene: Scene): void {
        super.registerName(scene.name);
        this._gameScenes[scene.name] = scene;

        if (this._loaded) scene.load();
    }

    /**
     * Gets a Scene from this manager by its name.
     * 
     * @param {string} name - The name of the Scene.
     */
    public getScene(name: string): Scene {
        if (this._gameScenes[name] === undefined) throw new Error(`Desired Scene "${name}" not found.`);

        return this._gameScenes[name];
    }

    /**
     * Sets the current Scene of this manager by its name. The Scene must already exist in this manager.
     * Also fires the {@link Events.SCENE_CHANGE} event.
     * 
     * @param {string} name - The name of the Scene.
     * 
     * @fires Events#SCENE_CHANGE
     */
    public setCurrentScene(name: string): void {
        this._SCENE_CHANGE_EVENT.invoke(null);

        this._currentScene = name;
    }

    public load(): void {
        if (this._loaded) return;

        Object.values(this._gameScenes).forEach((s) => s.load());

        this._loaded = true;
    }

    public update(): void {
        this.currentScene.update();
    }

    public render(): void {
        this.currentScene.render();
    }
}
