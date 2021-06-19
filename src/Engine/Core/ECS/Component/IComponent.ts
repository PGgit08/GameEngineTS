import { TEntity } from '@ecs/TEntity'; 
import { RenderProps } from '@renderer/IViewProps';

export default interface IComponent{
    load(): void;
    
    start(): void;

    update(dt: number): void;

    render(): void;

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
    setOwner(o: TEntity): void{
        this.owner = o;
    };

    /**
     * Loads this components for webgl(buffers+shaders) and more.
     */
    load(): void{};

    /**
     * The pre-loop operations of this component.
     */
    start(): void{};

    /**
     * The loop operations of this component, called on each frame update.
     * @param dt The delta time since the last update call.
     */
    update(dt: number): void{};

    /**
     * The render operations of this component.
     */
    render(): void{};
};
