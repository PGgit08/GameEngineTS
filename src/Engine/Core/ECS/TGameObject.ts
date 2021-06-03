/**
 * Any object(Entity) in the game.
 * Each object has a GLOBAL_ID.
 */
export class TGameObject{
    // current GLOBAL_ID(static)
    public static GLOBAL_ID: number = 0;

    // object's global id
    id: number;

    /**
     * @description Set's object global id when called.
     */
    constructor(){
        this.id = TGameObject.GLOBAL_ID ++;
    };
};
