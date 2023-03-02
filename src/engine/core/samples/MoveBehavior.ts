import { vec2 } from "gl-matrix";
import { Input } from "../../extra/Input";
import { Behavior } from "../ecs/Behavior";

export class MoveBehavior extends Behavior {
    public speed: number = 5;

    /**
     * Control the Entity with button pressed.
     * @param speed The speed of the movable Entity.
     */
    constructor() {
        super("MoveBehavior");
    }
    
    public start(): void {}

    public update(): void {
        if (Input.KeyPressed("KeyW")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, -1), this.speed);

            this.transform.localTranslate(translation);
        }

        if (Input.KeyPressed("KeyA")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(-1, 0), this.speed);

            this.transform.localTranslate(translation);
        }

        if (Input.KeyPressed("KeyS")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, 1), this.speed);

            this.transform.localTranslate(translation);
        }

        if (Input.KeyPressed("KeyD")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, -1), this.speed);

            this.transform.localTranslate(translation);
        }

        if (Input.KeyPressed("ArrowLeft")) {
            this.transform.rotate(-this.speed);
        }

        if (Input.KeyPressed("ArrowRight")) {
            this.transform.rotate(this.speed);
        }
    }
}