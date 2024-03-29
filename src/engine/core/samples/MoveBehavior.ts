import { vec2 } from "gl-matrix";
import { Input } from "../helpers/Input";
import { Behavior } from "../ecs/Behavior";
import { Time } from "../helpers/Time";

import { Entity } from "../ecs/Entity";

/**
 * A {@link Behavior} that allows for input control of a {@link Entity}. It moved the Entity on its local axis with WASD keys and
 * spins it with the left and right arrow keys.
 * 
 * @class MoveBeheavior
 * @extends Behavior
 */
export class MoveBehavior extends Behavior {
    public speed: number = 10; // pixels per second

    constructor(speed?: number) {
        super("MoveBehavior");

        if (speed !== undefined) {
            this.speed = speed;
        }
    }
    
    public override update(): void {
        if (Input.KeyDown("KeyW")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, -1), this.speed * Time.DeltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("KeyA")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(-1, 0), this.speed * Time.DeltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("KeyS")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, 1), this.speed * Time.DeltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("KeyD")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(1, 0), this.speed * Time.DeltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("ArrowLeft")) {
            this.transform.rotate(-this.speed * Time.DeltaTime());
        }

        if (Input.KeyDown("ArrowRight")) {
            this.transform.rotate(this.speed * Time.DeltaTime());
        }
    }
}