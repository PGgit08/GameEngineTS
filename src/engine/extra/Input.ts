import { vec2 } from "gl-matrix";
import { RendererManager } from "../core/managers/RendererManager";
import { SceneManager } from "../core/managers/SceneManager";

export class Input {
    private static _pressedKey: string = null;
    private static _newKey: boolean = null; // True if a the pressed key is new

    private static _mousePos: vec2 = vec2.fromValues(0, 0);

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

        document.addEventListener("mousemove", (e) => {
            if (RendererManager.getInstance().currentRenderer.mouseOver) {
                const rendererBox: DOMRect = RendererManager.getInstance().currentRenderer.box;

                vec2.set(
                    this._mousePos,
                    e.clientX - rendererBox.left,
                    e.clientY - rendererBox.top
                );

                vec2.transformMat3(this._mousePos, this._mousePos, SceneManager.getInstance().currentScene.currentCamera.transMat);

                this._mousePos[1] = -this._mousePos[1];
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
        return this._mousePos;
    }
}
