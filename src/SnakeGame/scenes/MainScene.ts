import { vec2 } from "gl-matrix";
import { Color, ColorMaterial, MeshComponent, Scene } from "../../engine/GETS";
import { HeadJointBehavior } from "../behaviors/HeadJointBehavior";
import { SnakeJoint } from "../entities/SnakeJoint";

export class MainScene extends Scene {
    constructor(){
        super("MainScene");

        const headJoint = new SnakeJoint();

        // CURSED
        (headJoint.getComponent(MeshComponent).mesh.material as ColorMaterial).color = Color.GREEN;

        headJoint.transform.position = vec2.fromValues(200, 200);

        headJoint.addBehaviors(new HeadJointBehavior());

        this.addEntities(headJoint);
    }
}
