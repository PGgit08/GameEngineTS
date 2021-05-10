import Renderer from "@renderer/Renderer";
import IViewProps from "@renderer/IViewProps";

let viewProps: IViewProps = {
    width: "800px",
    height: "600px",
    deltaTime: 0
};

const Render = new Renderer(viewProps);
console.log("Hello World!");