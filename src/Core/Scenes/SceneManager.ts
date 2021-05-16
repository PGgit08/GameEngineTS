import Scene, { IScene }  from "@scenes/Scene";

// a scene manager class for the games scenes
// this is created so that scenes can be accessed
// anywhere globally through this class's static

export default class SceneManager{
    // an object of registers scenes in the game
    public static GAME_SCENES: {[name: string]: Scene} = {};
    
    // the current scene
    public static CURRENT_SCENE: Scene;

    public static addScene(scene: Scene): void{
        this.GAME_SCENES[scene.name] = scene;
    };

    public static setCurrentScene(name: string): void{
        this.CURRENT_SCENE = this.GAME_SCENES[name];
    };

    public static getScene(name: string): Scene{
        return this.GAME_SCENES[name];
    };
};