import { vec2 } from "gl-matrix";
import { Input } from "../../extra/Input";
import { Behavior } from "../ecs/Behavior";
import { SpriteComponent, Time } from "../../GETS";

export class MoveBehavior extends Behavior {
    public speed: number = 50; // pixels per second

    /**
     * Control the Entity with button pressed.
     * @param speed The speed of the movable Entity.
     */
    constructor() {
        super("MoveBehavior");
    }
    
    public start(): void {
        this.parent.getComponent(SpriteComponent).sprite.setFrame('emoji');
    }

    public update(): void {
        if (Input.KeyDown("KeyW")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, -1), this.speed * Time.deltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("KeyA")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(-1, 0), this.speed * Time.deltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("KeyS")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(0, 1), this.speed * Time.deltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("KeyD")) {
            const translation = vec2.create();
            vec2.scale(translation, vec2.fromValues(1, 0), this.speed * Time.deltaTime());

            this.transform.localTranslate(translation);
        }

        if (Input.KeyDown("ArrowLeft")) {
            this.transform.rotate(-this.speed * Time.deltaTime());
        }

        if (Input.KeyDown("ArrowRight")) {
            this.transform.rotate(this.speed * Time.deltaTime());
        }
    }
}