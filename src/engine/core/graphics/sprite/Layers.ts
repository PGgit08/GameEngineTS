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
}
