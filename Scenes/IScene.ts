namespace Engine{
    /* Really basic scene interface for now */
    export interface IScene{
        // entities in this scene
        entities: TEntity[];

        /* To add later */
        // cameras: TEntity[];
        // lights: TEntity[];

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
    export abstract class TScene implements IScene{
        entities: TEntity[];

        readonly id: number;
        name: string;

        update(): void{
            for(let entity of this.entities){
                /* pre-rendering operations can be done here */
            };
        };

        render(): void{
            /* For now calling each items "render" function, 
            but later rendering system will get more advanced */
            for(let entity of this.entities){
                /* render entity here */
            };
        };
    };
};