import { Entity } from "../ecs/Entity";
import { GameObject } from "../ecs/GameObject";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "./SceneManager";

export class Scene extends GameObject implements Lifecycle {
    private _rootEntity: Entity;

    constructor(name: string) {
        super(name);

        this._rootEntity = new Entity("ROOT_ENTITY");

        SceneManager.getInstance().addScene(this);
    }

    public start(): void {
        console.log("Scene Start! @ID " + this.id);

        this._rootEntity.start();
    }

    public update(): void {
        console.log("Scene Update!");

        this._rootEntity.update();
    }

    public render(): void {
        console.log("Scene Render!");

        this._rootEntity.render();
    }
}
