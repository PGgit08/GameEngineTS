/* 
Properties of a RenderView
DeltaTime,
Width,
Height,
etc.
*/
export default interface IViewProps{
    // basic physical css properties
    width: string,
    height: string,

    // game engine properties
    deltaTime: number
};