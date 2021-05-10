import IViewProps from "@renderer/IViewProps";
import RenderView from "@renderer/RenderView";

export default class Renderer{
    renderView: RenderView;
    viewProps: IViewProps;

    constructor(viewProps:IViewProps, canvasId:string="gCanvas"){
        this.renderView = new RenderView(canvasId, viewProps);
        this.viewProps = viewProps;
    };
};