import TEntity from '@ecs/TEntity';
import { RendererProps } from '@renderer/IViewProps';
import TGameObject from '@ecs/TGameObject';
import SceneManager from '@scenes/SceneManager';

/* Really basic scene interface for now */
export interface IScene{
    // create main "parent" entity
    // which holds all the children entities 
    // in the scene
    root_entity: TEntity;

    /* To add later */
    // cameras: TEntity[];
    // lights: TEntity[];

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
export default class Scene extends TGameObject implements IScene{
    root_entity: TEntity;

    // names of scene
    readonly id: number;
    name: string;


    // set the renderview in the constructor
    constructor(name: string){
        // setting this scene's id to the 
        // global id in the engine
        super();
        this.name = name;
        this.root_entity = new TEntity('ROOT');
        SceneManager.addScene(this);
    };

    getEntityByName(name: string){
        return this.root_entity.getEntityByName(name);
    };

    addObject(entity: TEntity){
        this.root_entity.addChild(entity);
    };

    start(): void{
        this.root_entity.start();
    };

    update(dt: number): void{
        this.root_entity.update(dt);
    };

    render(renderProps: RendererProps): void{
        this.root_entity.render(renderProps);
    };

    /* TODO: add entity adding */
};