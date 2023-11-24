/**
 * @classdesc 
 * A static singleton class that contains information about time such as the delta time since the last frame render.
 * 
 * @hideconstructor
 */
export class Time {
    private static _lastFrameRender: number = 0;
    private static _deltaTime: number;

    /**
     * "Pauses" Time in the Engine by setting the delta time to 0 if true.
     * 
     * @static
     * 
     * @type {boolean}  
     */
    public static stopTime: boolean = false;

    private constructor() {} // static class, hidden constructor

    /**
     * Supply the class with when the last frame render occured.
     * 
     * @static
     * 
     * @param {number} time - The time in seconds when the last frame render occured.
     */
    public static AddLastFrameRender(time: number): void {
        this._deltaTime = time - this._lastFrameRender;

        this._lastFrameRender = time;
    }

    /**
     * @static
     * 
     * @returns {number} The time since the last frame render in seconds.
     */
    public static DeltaTime(): number {
        if (this.stopTime) {
            return 0;
        }

        return this._deltaTime;
    }
}
