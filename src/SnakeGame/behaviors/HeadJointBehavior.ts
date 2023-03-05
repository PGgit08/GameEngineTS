import { vec2 } from "gl-matrix";
import { Behavior, Entity } from "../../engine/GETS";
import { SnakeJoint } from "../entities/SnakeJoint";

export class HeadJointBehavior extends Behavior {
    private _joints: SnakeJoint[] = [];

    constructor() {
        super("HeadJointBehavior");
    }

    public start(): void {
        this._joints.push(Entity.Spawn(SnakeJoint));
        this._joints[0].transform = this.transform;
    }

    public update(): void {
        const oldPos = this.transform.position;

        this.transform.localTranslate(vec2.fromValues(0, -10));

        // this._joints[0].transform.position = oldPos;

        console.log(oldPos, this.transform);
    }
}
