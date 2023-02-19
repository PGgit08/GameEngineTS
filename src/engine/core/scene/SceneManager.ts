import Lifecycle from "../Lifecycle";
import Dictionary from "../types/Dictionary";
import SampleScene from "../world/SampleScene";
import Scene from "./Scene";

export default class SceneManager implements Lifecycle {
    private static _instance: SceneManager;

    private _gameScenes: Dictionary<string, Scene> = {}; // id: Scene (SHOULD BE CHANGED LATER TO NAME)
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
        this._gameScenes[scene.id] = scene;
    }

    public getScene(id: string): Scene {
        return this._gameScenes[id];
    }

    public setCurrentScene(scene: Scene): void {
        this.addScene(scene);
        this._currentScene = scene;
    }

    public setCurrentSceneById(id: string): void {
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
