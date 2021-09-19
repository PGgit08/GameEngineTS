import { GLMatrix4 } from "Core/GL/GLMatrix4";

// these are physical properties of a renderview
export interface RenderViewProps {
    // basic physical css properties
    width: number,
    height: number,
};

// these are game engine properties of a renderer
export interface RenderProps {
    // matricies used to represent the view and projection
    vMatrix: GLMatrix4;
    pMatrix: GLMatrix4;
};