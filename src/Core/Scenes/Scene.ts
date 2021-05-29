import { TEntity } from '@ecs/TEntity';
import { RendererProps } from '@renderer/IViewProps';
import { TGameObject } from '@ecs/TGameObject';
import { SceneManager } from '@scenes/SceneManager';

/* Really basic scene interface for now */
export interface IScene{
    // create main "parent" entity
    // which holds all the children entities 
    // in the scene
    root_entity: TEntity;

    // scene id/name
    readonly id: number;
    name: string;

    addObject(entity: TEntity): void;
    getEntityByName(name: string): TEntity;

    // update and rendering functions
    update(dt: number): void;
    render(renderProps: RendererProps): void;
};

// if a scene needs to be created, this class 
// can be called, and this scene can get pushed into
// the game loop
export class Scene implements IScene{
    root_entity: TEntity;

    // names of scene
    readonly id: number;
    name: string;


    /**
     * Creates a new scene which is added to the SceneManager.
     * @param name The Name of this scene.
     */
    constructor(name: string){
        this.name = name;
        this.root_entity = new TEntity('ROOT');
        SceneManager.addScene(this);
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
        this.root_entity.update(dt);
    };

    /**
     * Renders all Entities in this scene.
     * @param renderProps The game-engine properties of the renderer.
     */
    render(renderProps: RendererProps): void{
        this.root_entity.render(renderProps);
    };

    /* TODO: add entity adding */
};