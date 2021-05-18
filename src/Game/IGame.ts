/**
 * @description Incase game creator wants to do game logic, 
 * in game loop, they can do so in an IGame.
 */
export default interface IGame{
    /**
     * Called at the beggining of the game, before game loop.
     */
    Start: () => void;

    /**
     * Called on every frame update.
     * @param deltaTime Time since last frame update call.
     */
    Update: (deltaTime: number) => void;
    
    /**
     * Called on every frame update.
     * @param deltaTime Time since last frame render call.
     */
    Render: (deltaTime: number) => void;
};