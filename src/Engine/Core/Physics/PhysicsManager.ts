import { Physics } from "Engine/Core/Physics/Physics";

/**
 * Manages all physics and current physics used in scene.
 */
export class PhysicsManager{
    // an object of all registered physics in the game
    public static GAME_PHYSICS: {[scene: string]: Physics} = {};

    // the current physics
    public static CURRENT_PHYSICS: Physics;

    /**
     * Adds a Physics to the PhysicsManager.
     * @param physics The physics to add.
     */
    public static addPhysics(physics: Physics){
        this.GAME_PHYSICS[physics.scene.name] = physics;
    };

    /**
     * Gets a Physics from the PhysicsManager.
     * @param physics The physics to retrieve.
     * @returns Physics.
     */
    public static getPhysics(physics: Physics){
        return this.GAME_PHYSICS[physics.scene.name];
    };

    /**
     * Sets the current Physics.
     * @param physics The Physics to set.
     */
    public static setCurrentPhysics(physics: Physics){
        this.CURRENT_PHYSICS = this.GAME_PHYSICS[physics.scene.name];
    };
};