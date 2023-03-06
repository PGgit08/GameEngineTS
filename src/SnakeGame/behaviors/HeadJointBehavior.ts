import { vec2 } from "gl-matrix";
import { Behavior, Entity, Input } from "../../engine/GETS";
import { SnakeJoint } from "../entities/SnakeJoint";

export class HeadJointBehavior extends Behavior {
    private _joints: SnakeJoint[] = [];
    private readonly leftDisplacement: vec2 = vec2.fromValues(-30, 0);
    private readonly rightDisplacement: vec2 = vec2.fromValues(30, 0); 

    private _displacement: vec2 = this.rightDisplacement;

    private _displacement2: vec2 = vec2.fromValues(0, -30);

    constructor() {
        super("HeadJointBehavior");
    }

    public start(): void {
        this._joints.push(Entity.Spawn(SnakeJoint));
    }

    public update(): void {
        const oldPos = this.transform.position;

        if (Input.KeyPressed("ArrowLeft")) {
            this.transform.rotate(-90);
        }

        if (Input.KeyPressed("ArrowRight")) {
            this.transform.rotate(90);
        }

        this.transform.localTranslate(this._displacement2);

        this._joints[this._joints.length - 1].transform.position = oldPos;
    }
}