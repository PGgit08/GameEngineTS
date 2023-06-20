import { vec2 } from "gl-matrix";
import { RendererManager } from "../core/managers/RendererManager";
import { SceneManager } from "../core/managers/SceneManager";
import { Event } from "../core/events/Event";
import { Events } from "../core/events/Events";

export class Input {
    private static _pressedKey: string = null;
    private static _newKey: boolean = null; // True if a the pressed key is new

    private static _mousePos: vec2 = vec2.fromValues(0, 0);

    // several events that can be accessed rather than accessing the DOM
    private static _keyUp: Event<KeyboardEvent> = new Event(Events.KEY_UP);
    private static _keyDown: Event<KeyboardEvent> = new Event(Events.KEY_DOWN);
    private static _mouseMove: Event<MouseEvent> = new Event(Events.MOUSE_MOVE);
 
    /**
     * Adds event listeners to the browser, should be called in the loading period.
     */
    public static addListeners() {
        document.addEventListener("keyup", (e) => {
            this._keyUp.invoke(e);

            this._pressedKey = null;
        });
        
        document.addEventListener("keydown", (e) => {
            this._keyDown.invoke(e);

            if (this._pressedKey !== e.code) { this._pressedKey = e.code; this._newKey = true; }
        });

        document.addEventListener("mousemove", (e) => {
            this._mouseMove.invoke(e);

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
     * Returns true if the given key is/was pressed during the frame.
     */
    public static KeyPressed(key: string): boolean {
        if (this._pressedKey === key && this._newKey) {
            this._newKey = false;
            return true;
        } else { return false; }
    }

    /**
     * Returns true if the given key is down during the frame.
     */
    public static KeyDown(key: string): boolean {
        if (this._pressedKey === key) {
            return true;
        } else { return false; }
    }

    /**
     * Returns the position of the mouse.
     */
    public static MousePos(): vec2 {
        return vec2.transformMat3(vec2.create(), this._mousePos, SceneManager.getInstance().currentScene.currentCamera.worldMat);
    }
}
