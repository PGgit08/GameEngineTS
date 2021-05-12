import TGameObject from '@ecs/TGameObject';
import IComponent, { TComponent } from '@ecs/Components/IComponent';

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

    addComponent(component: TComponent){
        component.setOwner(this);
        this.components.push(component);
    };

    addChild(child: TEntity){
        this.children.push(child);
    };

    /**
    * Recursively attempts to retrieve a child entity with the given name from this entity or its children.
    * @param name The name of the entity to retrieve.
    */
    getEntityByName( name: string ): TEntity {
        if ( this.name === name ) {
            return this;
        }

        for ( let child of this.children ) {
            let result = child.getEntityByName( name );
            if ( result !== undefined ) {
                return result;
            }
        }

        return undefined;
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
