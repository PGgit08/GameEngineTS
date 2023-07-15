import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";
import Dictionary from "../../types/Dictionary";
import { Camera } from "../graphics/Camera";
import { Layers } from "../graphics/sprite/Layers";

/**
 * @classdesc
 * A hierarchy GameObject that has child {@link Entity} classes. When this Scene is created it is automatically added to the {@link SceneManager}.
 * This class implements the {@link Lifecycle} interface and its Lifecycle methods are called whenever the SceneManager's Lifecycle methods
 * are called. However, its {@link load} method is not only called during the LOAD period, but also whenever this Scene is added into the
 * SceneManager. 
 * 
 * @class Scene
 * @extends GameObject
 * @implements {Lifecycle}
 * 
 * @param {string} name - The name of this Scene.
 */
export class Scene extends GameObject implements Lifecycle {
    private _rootEntity: Entity;

    private _sceneCameras: Dictionary<string, Camera> = {}; 
    private _currentCamera: string;

    public readonly layers: Layers = new Layers();

    /** @returns {Camera} The current Camera that views this Scene. */
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

    /**
     * Adds entities into this Scene.
     * 
     * @param {Entity[]} entities - The entities to add.
     */
    public addEntities(...entities: Entity[]): void {
        this._rootEntity.addChildren(...entities);
    }

    /**
     * Removes entities from this Scene.
     * 
     * @param {Entity} enitity - The entity to remove.
     */
    public removeEntity(enitity: Entity): void {
        this._rootEntity.removeChild(enitity);
    }

    /**
     * Adds a Camera directly to this Scene.
     * 
     * @param {Camera} camera - The Camera to add.
     */
    public addCamera(camera: Camera): void {
        if (!camera.isParentScene(this.name)) {
            this.addEntities(camera);
        } else {
            this._sceneCameras[camera.name] = camera;
        }
    }

    /**
     * Removes a Camera directly from this Scene.
     * 
     * @param {string} name - The name of the Camera to remove.
     */
    public removeCamera(name: string): void {
        const cam = this._sceneCameras[name];

        if (cam.isParentScene(this.name)) {
            cam.parent.removeChild(cam);
        } else {
            delete this._sceneCameras[name];
        }
    }

    /**
     * Get a Camera from this Scene.
     * 
     * @param {string} name - The name of the Camera to get.
     * 
     * @returns {Camera} The returned Camera (IF NOT FOUND, DEFAULT CAMERA IS RETURNED).
     */
    public getCamera(name: string): Camera {
        if (this._sceneCameras[name] === undefined) {
            return this.getCamera("DefaultCamera");
        }

        return this._sceneCameras[name];
    }

    /**
     * Sets the current Camera of this Scene by name.
     * 
     * @param {string} name - The name of the Camera to set as current.
     */
    public setCurrentCamera(name: string): void {
        this._currentCamera = name;
    }

    public load(): void {
        this._rootEntity.load();
    }

    public update(): void {
        this._rootEntity.update();
    }

    public render(): void {
        this._rootEntity.render();
    }
}
