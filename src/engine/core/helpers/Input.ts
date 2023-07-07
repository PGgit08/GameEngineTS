import { vec2 } from "gl-matrix";
import { RendererManager } from "../managers/RendererManager";
import { SceneManager } from "../managers/SceneManager";
import { Event } from "../events/Event";
import { Events } from "../events/Events";

import { Lifecycle } from "../Lifecycle";

/**
 * @classdesc
 * A static singleton class that can read keyboard and mouse inputs from the user. It also invokes any events related to keyboard input.
 * @hideconstructor
 * 
 * @fires Events#KEY_UP
 * @fires Events#KEY_DOWN
 * @fires Events#MOUSE_MOVE
 */
export class Input {
    private static _pressedKey: string = null;
    private static _newKey: boolean = null; // True if a the pressed key is new

    private static _mousePos: vec2 = vec2.fromValues(0, 0);

    // several events that can be accessed rather than accessing the DOM
    private static _KEY_UP_EVENT: Event<KeyboardEvent> = new Event(Events.KEY_UP);
    private static _KEY_DOWN_EVENT: Event<KeyboardEvent> = new Event(Events.KEY_DOWN);
    private static _MOUSE_MOVE_EVENT: Event<MouseEvent> = new Event(Events.MOUSE_MOVE);
 
    private constructor() {}; // static class

    /**
     * Adds event listeners to the browser, should be called in the {@link Lifecycle} loading period.
     * 
     * @static
     */
    public static addListeners() {
        document.addEventListener("keyup", (e) => {
            this._KEY_UP_EVENT.invoke(e);

            this._pressedKey = null;
        });
        
        document.addEventListener("keydown", (e) => {
            this._KEY_DOWN_EVENT.invoke(e);

            if (this._pressedKey !== e.code) { this._pressedKey = e.code; this._newKey = true; }
        });

        document.addEventListener("mousemove", (e) => {
            this._MOUSE_MOVE_EVENT.invoke(e);

            if (RendererManager.getInstance().currentRenderer.mouseOver) {
                const rendererBox: DOMRect = RendererManager.getInstance().currentRenderer.box;

                vec2.set(
                    this._mousePos,
                    e.clientX - rendererBox.left,
                    e.clientY - rendererBox.top
                );
            }
        });
    }

    /**
     * Checks if a key was fully pressed.
     * 
     * @static
     * 
     * @param {string} key - The javascript name of the key.
     * 
     * @returns {boolean} True if the desired key was fully pressed, False if not.
     */
    public static KeyPressed(key: string): boolean {
        if (this._pressedKey === key && this._newKey) {
            this._newKey = false;
            return true;
        } else { return false; }
    }

    /**
     * Checks if a key is held down during the current frame.
     * 
     * @static
     * 
     * @param {string} key - The javascript name of the key.
     * 
     * @returns {boolean} True if the desired key is held down, False if not. 
     */
    public static KeyDown(key: string): boolean {
        if (this._pressedKey === key) {
            return true;
        } else { return false; }
    }

    /**
     * The position of the mouse based on the Camera position.
     * 
     * @static
     * 
     * @returns {vec2} A 2D vector representing the position.
     */
    public static MousePos(): vec2 {
        return vec2.transformMat3(vec2.create(), this._mousePos, SceneManager.getInstance().currentScene.currentCamera.worldMat);
    }
}
