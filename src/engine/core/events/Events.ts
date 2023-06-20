export namespace Events {
    /**
     * An Event that gets invoked whenever the current Scene changes.
     * @type {null}
     */
    export const SCENE_CHANGE: string = "SCENE_CHANGE";

    /**
     * An Event that gets invoked whenever a key is released.
     * @type {KeyboardEvent}
     */
    export const KEY_UP: string = "KEY_UP";

    /**
     * An Event that gets invoked whenever a key is pushed.
     * @type {KeyboardEvent}
     */
    export const KEY_DOWN: string = "KEY_DOWN";

    /**
     * An Event that gets invoked whenever a key is pushed.
     * @type {MouseEvent}
     */
    export const MOUSE_MOVE: string = "MOUSE_MOUSE";
}
