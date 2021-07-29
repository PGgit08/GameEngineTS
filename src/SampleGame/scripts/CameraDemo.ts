// sample script for camera

import { TBehavior, Vector2 } from "@GETS";

// moves camera around
export class CameraDemo extends TBehavior{
    constructor(){
        super("CameraDemo");
    };

    start(){
        console.log('hello');
    };

    update(dt: number){
        console.log('call');
        // move camera to the right
        this.owner.worldTransform.position.add(Vector2.right);

        console.log(this.owner.worldTransform.position);

        super.update(dt);
    };
};