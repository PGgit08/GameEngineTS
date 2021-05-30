import { PhysicsManager } from "@physics/PhysicsManager";
import { Scene } from "@scenes/Scene";
import { Vector2 } from "./Vector";

/**
 * Physics properties in interface
 */
interface IPhysics{
    GRAVITY: Vector2;
};


/**
 * Controls physics of a scene.
 */
export class Physics implements IPhysics{
    // the scene that this physics belongs
    private _scene: Scene;

    // Physics properties(from interface)
    public GRAVITY: Vector2 = new Vector2(0, 0.02);

    constructor(scene: Scene){
        this._scene = scene;
        PhysicsManager.addPhysics(this);
    };

    public get scene(): Scene{
        return this._scene;
    };
};