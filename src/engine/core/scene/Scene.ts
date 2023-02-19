import { GameObject } from "../ecs/GameObject";
import { Lifecycle } from "../Lifecycle";
import { SceneManager } from "./SceneManager";

export class Scene extends GameObject implements Lifecycle {
    private _name: string;

    public get name(): string {
        return this._name;
    }

    constructor(name: string) {
        super();
        this._name = name;

        SceneManager.getInstance().addScene(this);
    }

    public start(): void {
        console.log("Scene Start!");
    }

    public update(): void {
        console.log("Scene Update!");
    }

    public render(): void {
        console.log("Scene Render!");
    }
}
