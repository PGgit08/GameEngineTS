import { IGame } from "@game/IGame";
import { GLMatrix4 } from "@gl/GLMatrix4";
import { RenderViewProps, RenderProps } from "@renderer/IViewProps";
import { RenderView } from "@renderer/RenderView";
import { SceneManager } from "@scenes/SceneManager";

/**
 * A full Renderer for the game.
 */
export class Renderer {
    private _renderView: RenderView;

    private static _viewProps: RenderViewProps;
    private static _renderProps: RenderProps;

    /**
     * Creates a new physical RenderView and gives it properties.
     * @param viewProps Physical properties of RenderView.
     * @param renderProps Engine properties of Renderer.
     * @param canvasId DOM id of the canvas. @default "GETS"
     */
    constructor(viewProps: RenderViewProps, canvasId: string="GETS"){
        this._renderView = new RenderView(canvasId, viewProps);
        this._renderView.SetupRenderer();

        Renderer._renderProps = {
            vMatrix: GLMatrix4.identity(),
            pMatrix: GLMatrix4.projection(viewProps.width, viewProps.height)
        };

        Renderer._viewProps = viewProps;
    };

    /**
     * Renders all elements of world on Renderer.
     * @param game The user's IGame.
     */
    renderWorld(game: IGame): void {
        GL.clear(GL.COLOR_BUFFER_BIT | GL.DEPTH_BUFFER_BIT);

        SceneManager.CURRENT_SCENE.render();
        game.Render();
    };

    // associates with Matricies and etc.
    public static get renderProps(): RenderProps {
        return this._renderProps;
    };

    // associates with HTML Physical Properties: width, height, etc
    public static get viewProps(): RenderViewProps {
        return this._viewProps;
    };
};