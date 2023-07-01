import { Behavior, Input } from "../../engine/GETS";

export class LookAtBehavior extends Behavior {
    constructor() {
        super("LookAtBehavior");
    }
    
    public override update(): void {        
        this.transform.lookAt(Input.MousePos());
    }
}