import { vec2 } from "gl-matrix";
import { Behavior, Entity, Input } from "../../engine/GETS";
import { SnakeJoint } from "../entities/SnakeJoint";

export class HeadJointBehavior extends Behavior {
    private _joints: SnakeJoint[] = [];
    private _displacement: vec2 = vec2.fromValues(0, -30);

    constructor() {
        super("HeadJointBehavior");
    }

    public start(): void {
        this._joints.push(Entity.Spawn(SnakeJoint), Entity.Spawn(SnakeJoint));

        setInterval(this.move.bind(this), 300); // move the snake at a much slower rate compared to frame rate
    }

    /**
     * Moves the whole snake.
     */
    private move(): void {
        const oldPos = this.transform.position;

        this.transform.localTranslate(this._displacement);

        const movedJoint: SnakeJoint = this._joints.pop();
        movedJoint.transform.position = oldPos;
        this._joints.unshift(movedJoint);
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
