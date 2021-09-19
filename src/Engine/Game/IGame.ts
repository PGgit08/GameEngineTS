/**
 * @description In case game creator wants to do game logic, 
 * in game loop, they can do so in an IGame.
 */

// more examples:
// Creator wants to instantiate some entity asset: do it in IGame(start)
// Creator wants to change the color of some entity: do it in Behavior(start/update)
export interface IGame{
    /**
     * Called at the beggining of the game, before game loop.
     */
    Start: () => void;

    /**
     * Called on every frame update.
     * @param deltaTime Time since last frame update call.
     */
    Update: () => void;
    
    /**
     * Called on every frame update.
     * @param deltaTime Time since last frame render call.
     */
    Render: () => void;
};