import { vec2 } from "gl-matrix";
import { Camera, Scene } from "../../engine/GETS";
import { HeadJointBehavior } from "../behaviors/HeadJointBehavior";
import { SnakeJoint } from "../entities/SnakeJoint";

export class MainScene extends Scene {
    constructor(){
        super("MainScene");

        const cam: Camera = new Camera("Cam");
        cam.size = 5;

        const headJoint = new SnakeJoint();

        headJoint.transform.position = vec2.fromValues(200, 200);

        headJoint.addBehaviors(new HeadJointBehavior());
        headJoint.addChildren(cam);

        this.setCurrentCamera("Cam");

        this.addEntities(headJoint);
    }
}
