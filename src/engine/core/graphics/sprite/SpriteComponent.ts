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

    /**
     * Set the layer of this SpriteComponent.
     */
    public set layer(layer: string) {
        if (this.parentScene !== null) {
            this.parentScene.layers.setLayer(this, layer);
        }

        this._layer = layer;
    }
    
    public get layer(): string {
        if (this.parentScene !== null) {
            return this.parentScene.layers.getLayer(this) || this._layer;
        } else {
            return this._layer;
        }
    }

    /**
     * Set the layer order of this SpriteComponent.
     * Order 0 -> Closest to Camera.
     */
    public set layerOrder(layerOrder: number) {
        if (this.parentScene !== null) {
            this.parentScene.layers.setLayerOrder(this, layerOrder);
        }

        this._layerOrder = layerOrder;
    }

    public get layerOrder(): number {
        if (this.parentScene !== null) {
            return this.parentScene.layers.getLayerOrder(this) || this._layerOrder;
        } else {
            return this._layerOrder;
        }
    }

    constructor(sprite: Sprite) {
        super("SpriteComponent");

        this.eventEmmiter.subscribe<Scene[]>(Events.PARENT_SCENE_CHANGE, (eventData) => {
            const oldScene = eventData.data[0];

            if (oldScene !== null) oldScene.layers.remove(this); // remove from old Layers
            
            this.layer = this._layer; 
            this.layerOrder = this._layerOrder;
        });

        this._sprite = sprite;
    }

    /**
     * Draws the Sprite belonging to this SpriteComponent.
     */
    public draw(): void {
        this._sprite.draw(
            this.parent.transform.toWorldMat(),
            RendererManager.getInstance().currentRenderer.projectionMat,
            SceneManager.getInstance().currentScene.currentCamera.view()
        );
    }

    public load(): void {
        this._sprite.load();
    }

    public override start(): void {}
    public override update(): void {}

    public override render(): void {
        this.parentScene.layers.next().draw();
    }
}
