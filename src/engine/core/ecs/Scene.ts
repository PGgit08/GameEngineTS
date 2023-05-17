import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";
import Dictionary from "../../extra/Dictionary";
import { Camera } from "../graphics/Camera";

export class Scene extends GameObject implements Lifecycle {
    private _rootEntity: Entity;

    private _sceneCameras: Dictionary<string, Camera> = {}; 
    private _currentCamera: Camera;

    get currentCamera(): Camera {
        return this._currentCamera;
    }

    constructor(name: string) {
        super(name);

        this._rootEntity = new Entity("ROOT_ENTITY", false);

        // add default camera
        this.addCamera(new Camera("DefaultCamera"));
        this.setCurrentCamera("DefaultCamera");

        SceneManager.getInstance().addScene(this);
    }

    public addEntities(...entities: Entity[]): void {
        this._rootEntity.addChildren(...entities);
    }

    public removeEntity(enitity: Entity): void {
        this._rootEntity.removeChild(enitity);
    }

    public addCamera(camera: Camera): void {
        this._sceneCameras[camera.name] = camera;
    }

    public getCamera(name: string): Camera {
        return this._sceneCameras[name];
    }

    public setCurrentCamera(name: string): void {
        this._currentCamera = this.getCamera(name);
    }

    public load(): void {
        this._rootEntity.load();
    }

    public start(): void {
        this._rootEntity.start();
    }

    public update(): void {
        this._rootEntity.update();
    }

    public render(): void {
        this._rootEntity.render();
    }
}
