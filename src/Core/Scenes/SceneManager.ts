import { IScene } from "@scenes/IScene";

// a scene manager class for the games scenes
// this is created so that scenes can be accessed
// anywhere globally through this class's static

export default class SceneManager{
    // an object of registers scenes in the game
    public static GAME_SCENES: {[name: string]: IScene} = {};
    
    // the current scene
    public static CURRENT_SCENE: IScene;
};