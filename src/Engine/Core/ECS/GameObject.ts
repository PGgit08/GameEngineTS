/**
 * Any object(Entity) in the game.
 * Each object has a GLOBAL_ID.
 */
export class GameObject {
    // current GLOBAL_ID(static)
    private static GLOBAL_ID: number = 0;

    // object's global id
    private id: number;

    /**
     * @description Set's object global id when called.
     */
    constructor(){
        this.id = GameObject.GLOBAL_ID ++;
    };

    get ID (): number {
        return this.id;
    };
};
