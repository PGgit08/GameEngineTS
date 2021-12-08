import { Wait } from "@extra/Wait";

/**
 * Pretty much just setTimeout but synchronous
 */
export class Timer {
    private _finished: boolean = false;

    /**
     * Sets a timer for a certian amount of time.
     * @param ms Milliseconds the timer runs for.
     */
    constructor(ms: number){
        Wait(ms).then(() => { this._finished = true });
    };

    /**
     * Function called after timer goes off.
     * @param callback The callback called after the timer goes off.
     */
    public after(callback: () => void): void {
        while(!this._finished);
        callback();
    };
};
