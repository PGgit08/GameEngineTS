import { Behavior, Input } from "../../engine/GETS";

export class LookAtBehavior extends Behavior {
    constructor() {
        super("LookAtBehavior");
    }
    
    public override start(): void {}

    public override update(): void {
        this.transform.lookAt(Input.MousePos());

        // console.log(...Input.MousePos());
    }
}