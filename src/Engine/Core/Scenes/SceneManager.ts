import { Scene }  from "@scenes/Scene";
import { Dictionary } from "@types";

// a scene manager class for the games scenes
// this is created so that scenes can be accessed
// anywhere globally through this class's static
export class SceneManager {
    // an object of registered scenes in the game
    public static GAME_SCENES: Dictionary<number, Scene> = {};
    
    // the current scene
    public static CURRENT_SCENE: Scene;

    /**
     * Adds a scene to the SceneManager.
     * @param scene The scene to add.
     */
    public static addScene(scene: Scene): void {
        this.GAME_SCENES[scene.ID] = scene;
    };

    /**
     * Gets a scene from the SceneManager.
     * @param name The name of the scene to retrieve.
     * @returns Scene.
     */ 
    public static getScene(id: number): Scene {
        return this.GAME_SCENES[id];
    };


    /**
     * Sets the current Scene.
     * @param name The name of the Scene to set.
     */
    public static setCurrentScene(scene: Scene): void {
        // NOTE: This also sets current's of different managers
        this.CURRENT_SCENE = scene;
    };
};