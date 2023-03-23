import { vec2 } from "gl-matrix";
import { Color, MeshComponent, Scene, StandardMaterial } from "../../engine/GETS";
import { HeadJointBehavior } from "../behaviors/HeadJointBehavior";
import { SnakeJoint } from "../entities/SnakeJoint";

export class MainScene extends Scene {
    constructor(){
        super("MainScene");

        const headJoint = new SnakeJoint();

        // CURSED (less cursed)
        // (headJoint.getComponent(MeshComponent).mesh.material as StandardMaterial).color = Color.GREEN;

        headJoint.transform.position = vec2.fromValues(200, 200);

        headJoint.addBehaviors(new HeadJointBehavior());

        this.addEntities(headJoint);
    }
}
