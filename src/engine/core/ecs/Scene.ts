import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";
import Dictionary from "../../extra/Dictionary";
import { Camera } from "../graphics/Camera";
import { Layers } from "../graphics/sprite/Layers";

export class Scene extends GameObject implements Lifecycle {
    private _rootEntity: Entity;

    private _sceneCameras: Dictionary<string, Camera> = {}; 
    private _currentCamera: string;

    public readonly layers: Layers = new Layers();

    get currentCamera(): Camera {
        return this.getCamera(this._currentCamera);
    }

    constructor(name: string) {
        super(name);

        this._rootEntity = new Entity("ROOT_ENTITY", false);
        this._rootEntity.parentScene = this;

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

    /**
     * Adds a Camera directly to this Scene.
     * @param camera The Camera to add.
     */
    public addCamera(camera: Camera): void {
        if (!camera.isParentScene(this.name)) {
            this.addEntities(camera);
        } else {
            this._sceneCameras[camera.name] = camera;
        }
    }

    public removeCamera(name: string): void {
        delete this._sceneCameras[name];
    }

    public getCamera(name: string): Camera {
        if (this._sceneCameras[name] === undefined) {
            return this.getCamera("DefaultCamera");
        }

        return this._sceneCameras[name];
    }

    public setCurrentCamera(name: string): void {
        this._currentCamera = name;
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
