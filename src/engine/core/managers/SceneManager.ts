import { Lifecycle } from "../Lifecycle";
import Dictionary from "../../extra/Dictionary";
import { Scene } from "../ecs/Scene";
import { NameRegistrar } from "../helpers/NameRegistrar";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

export class SceneManager extends NameRegistrar implements Lifecycle {
    private static _instance: SceneManager;

    private _gameScenes: Dictionary<string, Scene> = {}; // name: Scene
    private _currentScene: string;

    private _SCENE_CHANGE_EVENT: Event<null> = new Event(Events.SCENE_CHANGE);
    
    private _loaded: boolean = false;

    get currentScene(): Scene {
        return this.getScene(this._currentScene);
    }

    public static getInstance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }

        return this._instance;
    }

    private constructor() { super("SceneManager"); }

    public addScene(scene: Scene): void {
        super.registerName(scene.name);
        this._gameScenes[scene.name] = scene;

        if (this._loaded) scene.load();
    }

    public getScene(name: string): Scene {
        if (this._gameScenes[name] === undefined) throw new Error(`Desired Scene "${name}" not found.`);

        return this._gameScenes[name];
    }

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
