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
    }

    public update(): void {
        this._joints[0].transform.position = this.parent.transform.position;
        this.parent.transform.localTranslate(vec2.fromValues(0, -2));
    }
}
