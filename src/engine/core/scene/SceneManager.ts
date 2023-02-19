import { Lifecycle } from "../Lifecycle";
import Dictionary from "../types/Dictionary";
import { Scene } from "./Scene";

export class SceneManager implements Lifecycle {
    private static _instance: SceneManager = new SceneManager();

    private _gameScenes: Dictionary<string, Scene> = {}; // id: Scene (SHOULD BE CHANGED LATER TO NAME)
    private _currentScene: Scene = new Scene("SampleScene");

    get currentScene(): Scene {
        return this._currentScene;
    }

    public static getInstance(): SceneManager {
        return this._instance;
    }

    private constructor() {}

    public addScene(scene: Scene): void {
        this._gameScenes[scene.id] = scene;
    }

    public getScene(id: string): Scene {
        return this._gameScenes[id];
    }

    public setCurrentScene(id: string): void {
        this._currentScene = this.getScene(id);
    }

    public start(): void {
        this._currentScene.start();
    }

    public update(): void {
        this._currentScene.update();
    }

    public render(): void {
        this._currentScene.render();
    }
}
