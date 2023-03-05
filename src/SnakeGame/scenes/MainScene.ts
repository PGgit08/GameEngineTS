import { vec2 } from "gl-matrix";
import { MoveBehavior, Scene, SceneManager } from "../../engine/GETS";
import { HeadJointBehavior } from "../behaviors/HeadJointBehavior";
import { SnakeJoint } from "../entities/SnakeJoint";

export class MainScene extends Scene {
    constructor(){
        super("MainScene");

        SceneManager.getInstance().setCurrentScene(this);

        const headJoint = new SnakeJoint();

        headJoint.transform.position = vec2.fromValues(200, 200);
        headJoint.transform.scale = vec2.fromValues(0.2, 0.2);

        headJoint.addBehaviors(new MoveBehavior(), new HeadJointBehavior);

        this.addEntities(headJoint);
    }
}
