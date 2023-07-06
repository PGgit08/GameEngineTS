export class Time {
    private static _lastFrameRender: number = 0;
    private static _deltaTime: number;

    private static _currentTime: number; 

    /**
     * Supply information for when the last frame render occured.
     * @param time The time when the current frame render occured.
     */
    public static AddLastFrameRender(time: number): void {
        this._deltaTime = time - this._lastFrameRender;
        this._lastFrameRender = time;
    }

    /**
     * Supply the current time.
     * @param time The current time.
     */
    public static AddCurrentTime(time: number): void {
        this._currentTime = time;
    }

    /**
     * @returns The time since the last frame render.
     */
    public static DeltaTime(): number {
        return this._deltaTime;
    }

    public static CurrentTime(): number {
        return this._currentTime;
    }
}
