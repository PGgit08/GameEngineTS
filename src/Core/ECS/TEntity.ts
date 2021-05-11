import TGameObject from '@ecs/TGameObject';
import IComponent from '@ecs/Components/IComponent';

import Transform from '@physics/Transform';
import { RendererProps } from '@renderer/IViewProps';

export default class TEntity extends TGameObject{
    // entity properties
    name: string;

    children: TEntity[] = [];
    components: IComponent[] = [];
    
    transform: Transform = new Transform();

    constructor(name: string){
        super();
        this.name = name;
    };

    addChild(child: TEntity){
        this.children.push(child);
    };

    update(dt: number): void {
        for(let c of this.components){
            c.update(dt);
        };
    };

    /* NOTE: For now rendering just passes the context as a param,
        which isn't great preformance wise, but that can be fixed in 
        later development.
    */
    render(renderProps: RendererProps): void {
        for(let c of this.components){
            c.render(renderProps);
        };
    };
}; 
