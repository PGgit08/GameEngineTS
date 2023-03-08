export class Input {
    private static _pressedKey: string = null;
    private static _keyUp: boolean;


    /**
     * Adds event listeners to the browser, should be called in the loading period.
     */
    public static addListeners() {
        document.addEventListener("keyup", () => this._keyUp = true);
        document.addEventListener("keydown", (e) => { this._keyUp = false; this._pressedKey = e.code; });
    }

    /**
     * Returns true if the given key is pressed.
     */
    public static KeyPressed(key: string): boolean {
        if (this._pressedKey === key) {
            if (this._keyUp) { this._pressedKey = null; }
            
            return true;
        } else { return false; }
    }
}
