import { TEntity } from '@ecs/TEntity';
import { RenderProps } from '@renderer/IViewProps';
import { TGameObject } from '@ecs/TGameObject';
import { SceneManager } from '@scenes/SceneManager';
import { Camera } from 'Core/World/Camera/Camera';
import { ShaderManager } from '@gl/ShaderManager';


// if a scene needs to be created, this class 
// can be called, and this scene can get pushed into
// the game loop
export class Scene {
    private registeredCameras: Camera[] = [];
    public activeCamera: Camera;

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


    /**
     * Recursivly attempts to find an Entity in this scene.
     * @param name The name of the entity.
     * @returns Entity.
     */
    getEntityByName(name: string): TEntity{
        return this.root_entity.getEntityByName(name);
    };

    /**
     * Adds an Entity to the scene.
     * @param entity The Entity that needs to be added to the scene.
     */
    addObject(entity: TEntity){
        this.root_entity.addChild(entity);
    };

    /**
     * Preforms loading operations on all entities, called before start.
     * Mainly used for WebGL buffer loading for components, and assets.
     */
    load(): void{
        // create a default camera
        this.activeCamera = new Camera("DefaultCamera");
        this.root_entity.load();
    };

    /**
     * Preforms pre-update procedures on the Entities in this Scene.
     */
    start(): void{
        this.root_entity.start();
    };

    /**
     * Preforms update procedures on each frame on the Entities in this Scene.
     * @param dt The time since the last frame update.
     */
    update(dt: number): void{
        // set the view matrix to camera view matrix
        this.root_entity.update(dt);
    };

    /**
     * Renders all Entities in this scene.
     */
    render(): void{
        this.root_entity.render();
    };
};