import { Wait } from "@extra/Wait";

/**
 * Pretty much just setTimeout but synchronous
 */
export class Timer {
    // whether the timer is running or not
    private _running: boolean = false;

    // the callback called after the timer goes off
    public callback: () => void = () => {};

    // the milliseconds the timer runs for
    public ms: number;

    /**
     * Whether the timer is running or not.
     */
    public get running(): boolean {
        return this._running;
    };

    /**
     * Sets a timer for a certian amount of time.
     * @param ms Milliseconds the timer runs for ( default: 1000 ).
     * @param callback Optional function that is called after timer goes off ( default: () => void ).
     */
    constructor(ms: number = 1000, callback?: () => void){
        this.ms = ms;
        if(callback){
            this.callback = callback;
        };
    };

    /**
     * Runs the timer.
     */
    public run(): void {
        this._running = true;

        Wait(this.ms).then(() => {
            this.callback();
            this._running = false;
        });
    };
};
