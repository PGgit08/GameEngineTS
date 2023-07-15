/**
 * A namespace containing names of different names of common Events.
 * 
 * @namespace Events 
 */
export namespace Events {
    /**
     * An Event that gets invoked whenever the current Scene changes.
     * 
     * @event Events#SCENE_CHANGE
     * 
     * @type {null}
     */
    export const SCENE_CHANGE: string = "SCENE_CHANGE";

    /**
     * An Event that gets invoked whenever a key is released.
     * 
     * @event Events#KEY_UP
     * 
     * @type {KeyboardEvent}
     */
    export const KEY_UP: string = "KEY_UP";

    /**
     * An Event that gets invoked whenever a key is held down.
     * 
     * @event Events#KEY_DOWN
     * 
     * @type {KeyboardEvent}
     */
    export const KEY_DOWN: string = "KEY_DOWN";

    /**
     * An Event that gets invoked whenever the mouse is moved.
     * 
     * @event Events#MOUSE_MOVE
     * 
     * @type {MouseEvent}
     */
    export const MOUSE_MOVE: string = "MOUSE_MOUSE";

    /**
     * An Event belonging to a GameObject which gets invoked whenever its parent Scene changes. 
     * Returns old parent Scene and new parent Scene.
     * 
     * @event Events#PARENT_SCENE_CHANGE
     * 
     * @type {Scene[]}
     */
    export const PARENT_SCENE_CHANGE: string = "PARENT_SCENE_CHANGE";

    /**
     * When the parent Entity of this GameObject changes. Returns old parent and new parent Entity.
     * 
     * @event Events#PARENT_CHANGE
     * 
     * @type {Entity[]}
     */
    export const PARENT_CHANGE: string = "PARENT_CHANGE";
}
