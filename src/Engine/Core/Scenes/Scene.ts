import { TEntity } from '@ecs/TEntity';
import { TGameObject } from '@ecs/TGameObject';
import { SceneManager } from '@scenes/SceneManager';
import { Camera } from 'Core/World/Camera/Camera';
import { ShaderManager } from '@graphics/ShaderManager';
import { Renderer } from '@renderer/Renderer';


// if a scene needs to be created, this class 
// can be called, and this scene can get pushed into
// the game loop
export class Scene {
    private _registeredCameras: {[name: string]: Camera} = {};
    private _activeCamera: Camera;

    private root_entity: TEntity;

    // names of scene
    name: string;

    /**
     * Creates a new scene which is added to the SceneManager.
     * @param name The Name of this scene.
     */
    constructor(name: string){
        this.name = name;
        this.root_entity = new TEntity('ROOT');
        this.root_entity.visible = false;

        SceneManager.addScene(this);
    };


    public get loaded(): boolean{
        return this.root_entity.isLoaded;
    };

    public get activeCamera(): Camera{
        return this._activeCamera;
    };

    /**
     * Recursivly attempts to find an Entity in this scene.
     * @param name The name of the entity.
     * @returns Entity.
     */
    public getEntityByName(name: string): TEntity{
        return this.root_entity.getEntityByName(name);
    };

    /**
     * Adds an Entity to the scene.
     * @param entity The Entity that needs to be added to the scene.
     */
    public addObject(entity: TEntity): void{
        this.root_entity.addChild(entity);
    };

    /**
     * Preforms loading operations on all entities, called before start.
     * Mainly used for WebGL buffer loading for components, and assets.
     */
    public load(): void{
        // create a default camera, register it
        // NOTE: this is done in main.ts IGame.start() method as entity loading is done before Engine.load() call
        // let DefaultCamera: Camera = new Camera("DefaultCamera");
        // this.addObject(DefaultCamera);
        // this.registerCamera(DefaultCamera);

        // start loading ( recursive )
        this.root_entity.load();
    };

    /**
     * Preforms pre-update procedures on the Entities in this Scene.
     */
    public start(): void{
        this.root_entity.start();
    };

    /**
     * Preforms update procedures on each frame on the Entities in this Scene.
     * @param dt The time since the last frame update.
     */
    public update(): void{
        // set the view matrix to camera view matrix
        // Renderer.renderProps.vMatrix = this._activeCamera.view;

        // recursive update
        this.root_entity.update();
    };

    /**
     * Renders all Entities in this scene.
     */
    public render(): void{
        this.root_entity.render();
    };

    /**
     * Registers the provided camera with this level. Automatically sets as the active camera
     * if no active camera is currently set.
     * @param camera The camera to register.
     */
    public registerCamera(camera: Camera): void{
        if (this._registeredCameras[camera.name] === undefined){
            this._registeredCameras[camera.name] = camera;

            if (this._activeCamera === undefined){
                console.log(camera);
                this._activeCamera = camera;
            };
        }

        else { 
            console.warn("A camera named '" + camera.name + "' has already been registered. New camera not registered.");
        };
    };

    /**
     * Unregisters the provided camera with this level.
     * @param camera The camera to unregister.
     */
    public unregisterCamera(camera: Camera): void {
        if (this._registeredCameras[camera.name] !== undefined){
            delete this._registeredCameras[camera.name];
            if (this._activeCamera === camera){
                // NOTE: auto-activate the next camera in line?
                this._activeCamera = undefined;
            };
        } 
        
        else {
            console.warn("No camera named '" + camera.name + "' hsd been registered. Camera not unregistered.");
        };
    };
};