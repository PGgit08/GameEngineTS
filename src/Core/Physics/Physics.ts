import { PhysicsManager } from "@physics/PhysicsManager";

/**
 * Controls global physics of a scene.
 */
export class Physics{
    public name: string;

    constructor(){
        PhysicsManager.addPhysics(this);
    };
};