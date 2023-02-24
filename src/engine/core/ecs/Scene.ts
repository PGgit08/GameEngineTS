import { Entity } from "./Entity";
import { GameObject } from "./GameObject";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "../managers/SceneManager";

export class Scene extends GameObject implements Lifecycle {
    private _rootEntity: Entity;

    constructor(name: string) {
        super(name, true);

        this._rootEntity = new Entity("ROOT_ENTITY", false);

        SceneManager.getInstance().addScene(this);
    }

    public addEntities(...entities: Entity[]): void {
        this._rootEntity.addChildren(...entities);
    }

    public load(): void {
        this._rootEntity.load();
    }

    public start(): void {
        this._rootEntity.start();
    }

    public update(): void {
        this._rootEntity.update();
    }

    public render(): void {
        this._rootEntity.render();
    }
}
