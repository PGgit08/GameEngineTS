import { vec2 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { SpriteComponent } from "../graphics/sprite/SpriteComponent";
import { TextureManager } from "../managers/TextureManager";
import { Color } from "../graphics/Color";
import { RendererManager } from "../managers/RendererManager";
import { Sprite } from "../graphics/sprite/Sprite";

/**
 * Represents a game background by setting a Texture to Camera-ignore and to the size of the Renderer.
 * 
 * @class Background
 * @extends Entity
 * 
 * @param {string} texName - The name of the Texture to use (DEFAULT IS WHITE).
 */
export class Background extends Entity {
    private _texName: string;

    public set texName(texName: string) {
        this._texName = texName;

        this.getComponent(SpriteComponent).sprite.material.texture = TextureManager.getInstance().getTexture(this._texName);
    }

    public get texName(): string {
        return this._texName;
    }

    constructor(texName: string) {
        super("Background");

        this._texName = texName;

        this.addComponents(
            new SpriteComponent(
                new Sprite(this._texName)
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
