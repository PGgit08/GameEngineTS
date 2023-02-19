import { Lifecycle } from "../Lifecycle";
import Dictionary from "../types/Dictionary";
import { Scene } from "./Scene";

export class SceneManager implements Lifecycle {
    private static _instance: SceneManager = new SceneManager();

    private _gameScenes: Dictionary<number, Scene> = {}; // id: Scene
    private _currentScene: Scene = new Scene();

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

    public getScene(id: number): Scene {
        return this._gameScenes[id];
    }

    public setCurrentScene(id: number): void {
        this._currentScene = this.getScene(id);
    }

    public start(): void {
        
    }

    public update(): void {}
    public render(): void {}
}
