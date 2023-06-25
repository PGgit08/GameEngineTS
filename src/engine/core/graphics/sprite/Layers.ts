import Dictionary from "../../../extra/Dictionary";
import { SpriteComponent } from "./SpriteComponent";

export class Layers {
    // the game layers belonging to the whole game
    private static _gameLayersSet: boolean = false;
    private static _gameLayers: string[] = ["Default"];

    public static setGameLayers(gameLayers: string[]): void {
        if (!this._gameLayersSet) {
            this._gameLayers = gameLayers;
            this._gameLayersSet = true;
        } else {
            throw new Error("Cannot modify game layer order after they were set.");
        }
    }

    public static get gameLayers(): string[] {
        return this._gameLayers;
    }

    private _layers: Dictionary<string, SpriteComponent[]> = {};

    constructor() {
        Layers._gameLayers.forEach((layerName) => {
            this._layers[layerName] = new Array(1);
        });
    }

    public setLayer(spriteComp: SpriteComponent, newLayer: string): number {
        if (!Object.keys(this._layers).includes(newLayer)) throw new Error("Layer does not exist.");

        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            // first remove this SpriteComponent from its old position
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }

        let returnedLayerOrder: number;

        if (spriteComp.layerOrder < this._layers[newLayer].length) {
            // push into new layer with old layer order
            this._layers[newLayer].splice(spriteComp.layerOrder, 0, spriteComp);
            returnedLayerOrder = spriteComp.layerOrder;
        } else {
            // push into front of new layer
            this._layers[newLayer].splice(0, 0, spriteComp);
            returnedLayerOrder = 0;
        }

        return returnedLayerOrder;
    }

    public setLayerOrder(spriteComp: SpriteComponent, newLayerOrder: number): number {
        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            // first remove this SpriteComponent from its old position
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }

        let returnedLayerOrder: number;

        if (newLayerOrder < this._layers[spriteComp.layer].length) {
            // push into new layerOrder
            this._layers[spriteComp.layer].splice(newLayerOrder, 0, spriteComp);
            returnedLayerOrder = newLayerOrder;
        } else { returnedLayerOrder = spriteComp.layerOrder; }

        return returnedLayerOrder;
    }

    public getLayerOrder(spriteComp: SpriteComponent): number {
        return this._layers[spriteComp.layer].indexOf(spriteComp);
    }

    /**
     * Removes a given SpriteComponent from this Layers object.
     * @param spriteComp The SpriteComponent to remove.
     */
    public remove(spriteComp: SpriteComponent): void {
        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }
    }
}
