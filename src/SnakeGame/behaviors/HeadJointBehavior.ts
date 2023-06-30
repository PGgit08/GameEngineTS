import { vec2 } from "gl-matrix";
import { Behavior, Entity, Input, RendererManager } from "../../engine/GETS";
import { Food } from "../entities/Food";
import { SnakeJoint } from "../entities/SnakeJoint";

export class HeadJointBehavior extends Behavior {
    private _joints: SnakeJoint[] = [];
    private _displacement: vec2 = vec2.fromValues(0, -30);

    constructor() {
        super("HeadJointBehavior");
    }

    public override start(): void {
        setInterval(this.move.bind(this), 200); // move the snake at a much slower rate compared to frame rate
        setInterval(this.spawnFood.bind(this), 2000); // spawn food periodically @2000 ms
    }

    /**
     * Moves the whole snake.
     */
    private move(): void {
        const oldPos = this.transform.position;

        this.transform.localTranslate(this._displacement);

        if (this._joints.length > 0) {
            const movedJoint: SnakeJoint = this._joints.pop();
            movedJoint.transform.position = oldPos;
            this._joints.unshift(movedJoint);
        }
    }

    /**
     * Used to periodically spawn foods.
     */
    private spawnFood(): void {
        Entity.Spawn(Food, vec2.fromValues(
            Math.random() * RendererManager.getInstance().currentRenderer.width,
            Math.random() * RendererManager.getInstance().currentRenderer.height
        ));
    }

    public update(): void {
        if (Input.KeyPressed("ArrowLeft")) {
            this.transform.rotate(-90);
        }

        if (Input.KeyPressed("ArrowRight")) {
            this.transform.rotate(90);
        }
    }
}
