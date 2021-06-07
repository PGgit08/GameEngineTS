import { TBehavior } from "@ecs/Behavior/IBehavior";
import { PhysicsManager } from "./PhysicsManager";
import { Vector2 } from "./Vector";

/**
 * A behavior for 2D rigid body physics
 */
export class RigidBody extends TBehavior{
    velocity: Vector2 = Vector2.origin;

    constructor(){
        super("RigidBody");
    };

    update(){
        this.velocity.add(PhysicsManager.CURRENT_PHYSICS.GRAVITY);
        this.owner.worldTransform.position.add(this.velocity);
    };
};