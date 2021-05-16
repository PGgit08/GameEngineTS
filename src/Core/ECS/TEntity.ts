import TGameObject from '@ecs/TGameObject';
import { TComponent } from '@ecs/Components/IComponent';

import Transform from '@physics/Transform';
import { RendererProps } from '@renderer/IViewProps';
import { TBehavior } from '@ecs/Behaviors/IBehavior';

export default class TEntity extends TGameObject{
    // entity properties
    name: string;

    children: TEntity[] = [];
    parent: TEntity;

    components: TComponent[] = [];
    behaviors: TBehavior[] = []
    
    transform: Transform = new Transform();

    constructor(name: string){
        super();
        this.name = name;
    };

    addComponent(component: TComponent){
        component.setOwner(this);
        this.components.push(component);
    };

    addBehavior(behavior: TBehavior){
        behavior.setOwner(this);
        this.behaviors.push(behavior);
    };

    addChild(child: TEntity){
        child.parent = this;
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

    /**
    * Recursively attempts to retrieve a behavior with the given name from this entity or its children.
    * @param name The name of the behavior to retrieve.
    */
    public getBehaviorByName( name: string ): TBehavior {
        for ( let behavior of this.behaviors ) {
            if ( behavior.name === name ) {
                return behavior;
            }
        }

        for ( let child of this.children ) {
            let behavior = child.getBehaviorByName( name );
            if ( behavior !== undefined ) {
                return behavior;
            }
        }

        return undefined;
    };
    
    /**
     * Recursively attempts to retrieve a component with the given name from this entity or its children.
     * @param name The name of the component to retrieve.
     */
    public getComponentByName( name: string ): TComponent {
        for ( let component of this.components ) {
            if ( component.name === name ) {
                return component;
            }
        }

        for ( let child of this.children ) {
            let component = child.getComponentByName( name );
            if ( component !== undefined ) {
                return component;
            }
        }

        return undefined;
    };

    start(): void{
        for(let c of this.components){
            c.start();
        };

        for(let b of this.behaviors){
            b.start();
        };

        for(let c of this.children){
            c.start();
        };
    };

    update(dt: number): void {
        for(let c of this.components){
            c.update(dt);
        };

        for(let b of this.behaviors){
            b.update(dt);
        };  

        for(let c of this.children){
            c.update(dt);
        };
    };

 
    render(renderProps: RendererProps): void {
        for(let c of this.components){
            c.render(renderProps);
        };

        for(let c of this.children){
            c.render(renderProps);
        };
    };
}; 
