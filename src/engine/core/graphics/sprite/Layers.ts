import Dictionary from "../../../extra/Dictionary";
import { SpriteComponent } from "./SpriteComponent";

export class Layers {
    // the game layers belonging to the whole game
    private static _gameLayersSet: boolean = false;
    private static _gameLayers: string[] = ["Default", "Background"];

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
    private _counter: number = -1;

    constructor() {
        Layers._gameLayers.forEach((layerName) => {
            this._layers[layerName] = new Array(1);
        });
    }

    public next(): SpriteComponent {
        if (this._counter === Object.values(this._layers).flat(1).length - 1) {
            this._counter = -1
        }
        
        this._counter ++;

        return Object.values(this._layers).flat(1)[this._counter];
    }

    /**
     * Sets the layer of a given SpriteComponent. If its layer order does not work, then the SpriteComponent is pushed
     * to the front of the layer.
     * @param spriteComp The given SpriteComponent.
     * @param newLayer The new layer of the SpriteComponent.
     */
    public setLayer(spriteComp: SpriteComponent, newLayer: string): void {
        if (!Object.keys(this._layers).includes(newLayer)) throw new Error("Layer does not exist.");

        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            // first remove this SpriteComponent from its old position
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }

        if (spriteComp.layerOrder < this._layers[newLayer].length) {
            // push into new layer with old layer order
            this._layers[newLayer].splice(spriteComp.layerOrder, 0, spriteComp);
        } else {
            // push into front of new layer
            this._layers[newLayer].splice(0, 0, spriteComp);
        }
    }

    /**
     * Sets the layer order of a given SpriteComponent. If its layer order does not work, then it is pushed to the start of its
     * layer. 
     * @param spriteComp The given SpriteComponent.
     * @param newLayerOrder The new layer order of the SpriteComponent.
     */
    public setLayerOrder(spriteComp: SpriteComponent, newLayerOrder: number): void {
        if (newLayerOrder < 0) throw new Error("New layer order does not work.");

        if (this._layers[spriteComp.layer][spriteComp.layerOrder] === spriteComp) {
            // first remove this SpriteComponent from its old position
            this._layers[spriteComp.layer].splice(spriteComp.layerOrder, 1);
        }

        if (newLayerOrder < this._layers[spriteComp.layer].length) {
            // push into new layerOrder
            this._layers[spriteComp.layer].splice(newLayerOrder, 0, spriteComp);
        } else {
            // if layer order is too big, pushed to the end of the layer 
            this._layers[spriteComp.layer].splice(this._layers[spriteComp.layer].length - 1, 0, spriteComp);
        }
    }

    /**
     * Returns the layer of the given SpriteComponent. If the SpriteComponent can't be found at all, then null is returned.
     * @param spriteComp The given SpriteComponent.
     */
    public getLayer(spriteComp: SpriteComponent): string {
        const layer: string = Object.keys(this._layers).find(layer => this._layers[layer].indexOf(spriteComp) !== -1);
        
        if (layer === undefined) return null;

        return layer;
    }

    /**
     * Returns the layer order of the given SpriteComponent. If the SpriteComponent can't be found in its Layer,
     * then null is returned.
     * @param spriteComp The given SpriteComponent.
     */
    public getLayerOrder(spriteComp: SpriteComponent): number {
        if(this._layers[spriteComp.layer].indexOf(spriteComp) === -1) return null;

        return this._layers[spriteComp.layer].indexOf(spriteComp);
    }

    /**
     * Removes a given SpriteComponent from this Layers object if it is found.
     * @param spriteComp The givne SpriteComponent.
     */
    public remove(spriteComp: SpriteComponent): void {
        const layer = this.getLayer(spriteComp);
        const layerOrder = this.getLayerOrder(spriteComp);

        if (layer === null || layerOrder === null) return;

        if (this._layers[layer][layerOrder] === spriteComp) {
            this._layers[layer].splice(layerOrder, 1);
        }
    }
}
