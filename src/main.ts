import Renderer from "@renderer/Renderer";
import { RendererProps, RenderViewProps } from "@renderer/IViewProps";

let viewProps: RenderViewProps= {
    width: "800px",
    height: "600px"
};

let renderProps: RendererProps = {
    deltaTime: 1
};

const Render: Renderer = new Renderer(viewProps, renderProps);
console.log("Hello World!");