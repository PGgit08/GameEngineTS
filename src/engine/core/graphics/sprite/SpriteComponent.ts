import { Component } from "../../ecs/Component";
import { Scene } from "../../ecs/Scene";
import { Events } from "../../events/Events";
import { RendererManager } from "../../managers/RendererManager";
import { SceneManager } from "../../managers/SceneManager";
import { Sprite } from "./Sprite";

export class SpriteComponent extends Component {
    private _sprite: Sprite;
    
    private _layer: string = "Default";
    private _layerOrder: number = 0;

    public get sprite(): Sprite {
        return this._sprite;
    }

    public get layer(): string {
        return this._layer;
    }

    public set layer(layer: string) {
        if (this.parentScene !== null) {
            this._layerOrder = this.parentScene.layers.setLayer(this, layer); // change layer
        }

        this._layer = layer;
    }

    public get layerOrder(): number {
        if (this.parentScene !== null) {
            return this.parentScene.layers.getLayerOrder(this);
        }
    }

    public set layerOrder(layerOrder: number) {
        if (this.parentScene !== null) {
            this._layerOrder = this.parentScene.layers.setLayerOrder(this, layerOrder); // change order
            return;
        }

        this._layerOrder = layerOrder;
    }


    constructor(sprite: Sprite) {
        super("SpriteComponent");

        this.eventEmmiter.subscribeTo<Scene[]>(Events.PARENT_SCENE_CHANGE, (eventData) => {
            const oldScene = eventData.data[0];
            const newScene = eventData.data[1];

            if (oldScene !== null) oldScene.layers.remove(this); // remove from old Layers
            if (newScene !== null) this.layer = this._layer; this.layerOrder = this._layerOrder; // add to new Layers

            console.log(this._layer, this._layerOrder);
        });

        this._sprite = sprite;
    }

    public load(): void {
        this._sprite.load();
    }

    public override start(): void {}
    public override update(): void {}

    public override render(): void {
        this._sprite.render(
            this.parent.transform.toWorldMat(),
            RendererManager.getInstance().currentRenderer.projectionMat,
            SceneManager.getInstance().currentScene.currentCamera.view()
        );
    }
}
