import IGame from "@game/IGame";
import { RenderViewProps, RendererProps } from "@renderer/IViewProps";
import RenderView from "@renderer/RenderView";
import SceneManager from "@scenes/SceneManager";

export default class Renderer{
    renderView: RenderView;
    viewProps: RenderViewProps;
    renderProps: RendererProps;

    constructor(viewProps:RenderViewProps, renderProps: RendererProps, canvasId:string="gCanvas"){
        this.renderView = new RenderView(canvasId, viewProps);
        this.viewProps = viewProps;
        this.renderProps = renderProps;
    };

    renderWorld(game:IGame): void{
        SceneManager.CURRENT_SCENE.render(this.renderProps);
        game.Render(this.renderProps.deltaTime);
    };
};