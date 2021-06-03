import { TEntity } from 'Engine/Core/ECS/TEntity'; 
import { RendererProps } from 'Engine/Core/Renderer/IViewProps';

export default interface IComponent{
    start(): void;

    update(dt: number): void;

    render(renderProps: RendererProps): void;

    owner: TEntity;
    setOwner(owner: TEntity): void;
};

/**
 * A component that can be attached to an Entity.
 * Typically something visual.
 */
export abstract class TComponent implements IComponent{
    name: string

    owner: TEntity;

    /**
     * Creates a new component.
     * @param name The name of the component.
     */
    constructor(name: string){
        this.name = name;
    };

    /**
     * @deprecated (later when _name is private)
     * Gets name of this component.
     */
    public get getName(): string{
        return this.name
    };

    /**
     * Set's the owner of this component.
     * @param o The owner Entity.
     */
    setOwner(o: TEntity){
        this.owner = o;
    };

    /**
     * The pre-loop operations of this component.
     */
    start(){};

    /**
     * The loop operations of this component, called on each frame update.
     * @param dt The delta time since the last update call.
     */
    update(dt: number){};

    /**
     * The render operations of this component.
     * @param renderProps Render properties.
     */
    render(renderProps: RendererProps){};
};
