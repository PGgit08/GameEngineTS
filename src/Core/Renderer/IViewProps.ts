// these are physical properties of a renderview
export interface RenderViewProps{
    // basic physical css properties
    width: number,
    height: number,
};

// these are game engine properties of a renderer
export interface RendererProps{
    deltaTime: number;
};