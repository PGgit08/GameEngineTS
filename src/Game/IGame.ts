// an interface that can be implemented by the developer
// which contains all the game logic
export default interface IGame{
    // called at the beggining of the game flow
    Start: () => void;

    // called before each render
    Update: (deltaTime: number) => void;
    
    // called each frame-update after each Update call
    Render: (deltaTime: number) => void;
};