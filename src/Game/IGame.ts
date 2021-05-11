// an interface that can be implemented by the developer
// which contains all the game logic
export default interface IGame{
    // called before each render
    Update: (deltaTime: number) => {};
    
    // called each frame-update after each Update call
    Render: (deltaTime: number) => {};
};