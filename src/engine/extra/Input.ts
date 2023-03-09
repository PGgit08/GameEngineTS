export class Input {
    private static _pressedKey: string = null;
    private static _newKey: boolean = null; // True if a the pressed key is new (or when reset)


    /**
     * Adds event listeners to the browser, should be called in the loading period.
     */
    public static addListeners() {
        document.addEventListener("keyup", () => {
            this._pressedKey = null;
        });
        
        document.addEventListener("keydown", (e) => {
            if (this._pressedKey !== e.code) { this._pressedKey = e.code; this._newKey = true; }
        });
    }

    /**
     * Returns true if the given key is pressed during the frame.
     */
    public static KeyPressed(key: string): boolean {
        if (this._pressedKey === key && this._newKey) {
            this._newKey = false;         
            return true;
        } else { return false; }
    }
}
