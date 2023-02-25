import { Input } from "../../extra/Input";
import { Behavior } from "../ecs/Behavior";
import { Vector2 } from "../math/Vector2";

export class MoveBehavior extends Behavior {
    private _speed: number;

    /**
     * Control the Entity with button pressed.
     * @param speed The speed of the movable Entity.
     */
    constructor(speed: number = 5) {
        super("MoveBehavior");
        this._speed = speed;
    }
    
    public start(): void {
        // console.log("SampleBehavior Start!");
    }

    public update(): void {
        // console.log("SampleBehavior Update!");

        if (Input.KeyPressed("KeyW")) {
            this.transform.localTranslate(Vector2.numberScale(new Vector2(0, -1), this._speed));
        }

        if (Input.KeyPressed("KeyA")) {
            this.transform.localTranslate(Vector2.numberScale(new Vector2(-1, 0), this._speed));
        }

        if (Input.KeyPressed("KeyS")) {
            this.transform.localTranslate(Vector2.numberScale(new Vector2(0, 1), this._speed));
        }

        if (Input.KeyPressed("KeyD")) {
            this.transform.localTranslate(Vector2.numberScale(new Vector2(1, 0), this._speed));
        }

        if (Input.KeyPressed("ArrowLeft")) {
            this.transform.rotate(-this._speed);
        }

        if (Input.KeyPressed("ArrowRight")) {
            this.transform.rotate(this._speed);
        }
    }
}