import TEntity from '@ecs/TEntity';
import { RendererProps } from '@renderer/IViewProps';
import TGameObject from '@ecs/TGameObject';

/* Really basic scene interface for now */
export interface IScene{
    // create main "parent" entity
    // which holds all the children entities 
    // in the scene
    root_entity: TEntity;

    /* To add later */
    // cameras: TEntity[];
    // lights: TEntity[];

    /* RenderView that this scene is part of */
    // NOTE: not a physical render view
    // but a renderview's data
    readonly renderView: RendererProps;

    // scene id/name
    readonly id: number;
    name: string;

    // update and rendering functions
    update(): void;
    render(): void;
};

// if a scene needs to be created, this class 
// can be called, and this scene can get pushed into
// the game loop
export abstract class TScene extends TGameObject implements IScene{
    root_entity: TEntity;

    // names of scene
    readonly id: number;
    name: string;

    // renderview 
    readonly renderView: RendererProps;

    // set the renderview in the constructor
    constructor(renderView: RendererProps){
        // setting this scene's id to the 
        // global id in the engine
        super();
        this.renderView = renderView;
    };

    update(): void{
        this.root_entity.update();
    };

    render(): void{
        this.root_entity.render();
    };
};