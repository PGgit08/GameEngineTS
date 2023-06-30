import { Lifecycle } from "../Lifecycle";
import Dictionary from "../../extra/Dictionary";
import { Scene } from "../ecs/Scene";
import { Manager } from "./Manager";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

export class SceneManager extends Manager implements Lifecycle {
    private static _instance: SceneManager;

    private _gameScenes: Dictionary<string, Scene> = {}; // name: Scene
    private _currentScene: Scene;

    private _sceneChangeEvent: Event<null> = new Event(Events.SCENE_CHANGE);

    get currentScene(): Scene {
        return this._currentScene;
    }

    public static getInstance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
        }

        return this._instance;
    }

    private constructor() { super(); }

    public addScene(scene: Scene): void {
        super.registerName(scene.name);
        this._gameScenes[scene.name] = scene;
    }

    public getScene(name: string): Scene {
        return this._gameScenes[name];
    }

    public setCurrentScene(name: string): void {
        this._sceneChangeEvent.invoke(null);

        this._currentScene = this.getScene(name);
    }


    public load(): void {
        Object.values(this._gameScenes).forEach((s) => s.load());
    }

    public update(): void {
        this._currentScene.update();
    }

    public render(): void {
        this._currentScene.render();
    }
}
