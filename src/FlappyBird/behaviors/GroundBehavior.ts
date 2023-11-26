import { Behavior, Time } from "../../engine/GETS";

export class GroundBehavior extends Behavior {
    constructor() {
        super("GroundBehavior");
    }

    public override update(): void {
        this.transform.position[0] -= 10 * Time.DeltaTime();
    }
}