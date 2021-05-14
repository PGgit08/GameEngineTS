import { TComponent } from '@ecs/Components/IComponent';
import { RendererProps } from '@renderer/IViewProps';


export default class Particle extends TComponent{
    constructor(){
        super();
        
    };

    update(dt: number){
        /* This can later on be used for Circle2D.intersects */
    };

    render(renderProps: RendererProps){
        console.log("RENDER");
    };  
};
