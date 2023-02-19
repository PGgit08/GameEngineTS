import { Lifecycle } from "../Lifecycle";
import Dictionary from "../../extra/Dictionary";
import { SampleScene } from "../samples/SampleScene";
import { Scene } from "../scene/Scene";

export class SceneManager implements Lifecycle {
    private static _instance: SceneManager;

    private _gameScenes: Dictionary<string, Scene> = {}; // name: Scene
    private _currentScene: Scene;

    get currentScene(): Scene {
        return this._currentScene;
    }

    public static getInstance(): SceneManager {
        if (!this._instance) {
            this._instance = new SceneManager();
            this._instance.setCurrentScene(new SampleScene()); // create this scene by default
        }

        return this._instance;
    }

    private constructor() {}

    public addScene(scene: Scene): void {
        this._gameScenes[scene.name] = scene;
    }

    public getScene(name: string): Scene {
        return this._gameScenes[name];
    }

    public setCurrentScene(scene: Scene): void {
        this.addScene(scene);
        this._currentScene = scene;
    }

    public setCurrentSceneByName(name: string): void {
        this._currentScene = this.getScene(name);
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
