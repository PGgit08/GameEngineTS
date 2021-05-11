import TEntity from '@ecs/TEntity'; 
import { RendererProps } from '@renderer/IViewProps';

export default interface IComponent{
    update(dt: number): void;

    render(renderProps: RendererProps): void;

    owner: TEntity;
    setOwner(owner: TEntity): void;
};

// create an abstract class where setOwner sets the owner
// in the interface
export abstract class TComponent implements IComponent{
    owner: TEntity;

    setOwner(o: TEntity){
        this.owner = o;
    };

    update(dt: number){/* Is abstract, just a template */};

    render(renderProps: RendererProps){};
};
