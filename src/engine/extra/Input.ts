export class Input {
    private static _pressedKey: string = null;


    /**
     * Adds event listeners to the browser, should be called in the loading period.
     */
    public static addListeners() {
        document.addEventListener("keyup", () => this._pressedKey = null);
        document.addEventListener("keydown", (e) => this._pressedKey = e.code);
    }

    /**
     * Returns true if the given key is pressed.
     */
    public static KeyPressed(key: string): boolean {
        if (this._pressedKey === key) {
            return true;
        } else { return false; }
    }
}
