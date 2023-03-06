import { vec2 } from "gl-matrix";
import { Behavior, Entity, Input, Transform } from "../../engine/GETS";
import { SnakeJoint } from "../entities/SnakeJoint";

export class HeadJointBehavior extends Behavior {
    private _joints: SnakeJoint[] = [];
    private readonly leftDisplacement: vec2 = vec2.fromValues(-10, 0);
    private readonly rightDisplacement: vec2 = vec2.fromValues(10, 0); 

    private _displacement: vec2 = this.rightDisplacement;

    constructor() {
        super("HeadJointBehavior");
    }

    public start(): void {
        // const initPos: vec2 = vec2.subtract(vec2.create(), this.transform.position, vec2.fromValues(30, 0));
        const initTrans: Transform = new Transform();

        // initTrans.position = initPos;

        this._joints.push(Entity.Spawn(SnakeJoint, initTrans));
    }

    public update(): void {
        const oldPos = this.transform.position;

        if (Input.KeyPressed("ArrowLeft")) {
            this._displacement = this.leftDisplacement;
        }

        if (Input.KeyPressed("ArrowRight")) {
            this._displacement = this.rightDisplacement;
        }

        this.transform.translate(this._displacement);

        this._joints[this._joints.length - 1].transform.position = oldPos;
    }
}
