import { vec2 } from "gl-matrix";
import { Color, Entity, RendererManager, Sprite, SpriteComponent, TextureManager } from "../../engine/GETS";

export class Background extends Entity {
    private _texName: string;

    public set texName(texName: string) {
        this._texName = texName;

        this.getComponent(SpriteComponent).sprite.material.texture = TextureManager.getInstance().getTextureByName(this._texName);
    }

    public get texName(): string {
        return this._texName;
    }

    constructor(texName: string) {
        super("Background");

        this._texName = texName;

        this.addComponents(
            new SpriteComponent(
                new Sprite("FTEXT")
            )
        );

        this.getComponent(SpriteComponent).sprite.material.color = Color.WHITE;
        this.getComponent(SpriteComponent).layer = "Background";

        this.transform.ignoreCamSize = true;
        this.transform.scale = vec2.fromValues(
            RendererManager.getInstance().currentRenderer.width / this.getComponent(SpriteComponent).sprite.width,
            RendererManager.getInstance().currentRenderer.height / this.getComponent(SpriteComponent).sprite.height,
        );
    }
}
