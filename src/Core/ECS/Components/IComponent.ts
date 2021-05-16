import TEntity from '@ecs/TEntity'; 
import { RendererProps } from '@renderer/IViewProps';

export default interface IComponent{
    start(): void;

    update(dt: number): void;

    render(renderProps: RendererProps): void;

    owner: TEntity;
    setOwner(owner: TEntity): void;
};

// create an abstract class where setOwner sets the owner
// in the interface
export abstract class TComponent implements IComponent{
    name: string

    owner: TEntity;

    constructor(name: string){
        this.name = name;
    };

    public get getName(): string{
        return this.name
    };

    setOwner(o: TEntity){
        this.owner = o;
    };

    start(){};

    update(dt: number){/* Is abstract, just a template */};

    render(renderProps: RendererProps){};
};
