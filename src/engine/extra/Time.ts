export class Time {
    private static _lastFrameRender: number = 0;
    private static _deltaTime: number;

    /**
     * Supply information for when the last frame render occured.
     * @param time The time when the current frame render occured.
     */
    public static addLastFrameRender(time: number): void {
        this._deltaTime = time - this._lastFrameRender;
        this._lastFrameRender = time;
    }

    /**
     * @returns The time since the last frame render.
     */
    public static deltaTime(): number {
        return this._deltaTime;
    }
}
