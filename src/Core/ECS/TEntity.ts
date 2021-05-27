import TGameObject from '@ecs/TGameObject';
import { TComponent } from '@ecs/Component/IComponent';

import Transform from '@physics/Transform';
import { RendererProps } from '@renderer/IViewProps';
import { TBehavior } from '@ecs/Behavior/IBehavior';

export default class TEntity extends TGameObject{
    name: string;

    children: TEntity[] = [];
    parent: TEntity;

    components: TComponent[] = [];
    behaviors: TBehavior[] = []
    

    /* 
        TODO: Next thing to do:
        Work on Transform.
        More specifically, give each entity these:
        
        localTransform(or matrix?): This entity's Transform relative to it's parent
        worldTransform(or matrix?): This entity's Transform relative to the scene
    */    
    transform: Transform = new Transform();

    /**
     * Creates a new entity.
     * @param name The name of the entity.
     * @param components An optional parameter for adding a list of components to this Entity.
     */
    constructor(name: string, components?: TComponent[]){
        super();
        this.name = name;
        
        if(components){
            for(const component of components){
                this.addComponent(component);
            };
        };
    };

    /**
     * Adds a behavior to this entity.
     * @param behavior The behavior that needs to be added to the entity.
     */
    addBehavior(behavior: TBehavior){
        behavior.setOwner(this);
        this.behaviors.push(behavior);
    };

    /**
     * Adds a component to this entity.
     * @param component The component that needs to be added to the entity.
     */
    addComponent(component: TComponent){
        component.setOwner(this);
        this.components.push(component);
    };

    /**
     * Adds a child to the entity.
     * @param child The child entity that needs to be added to this entity.
     */
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
    public getComponentByName(name: string): TComponent{
        for (let component of this.components){
            if(component.name === name){
                return component;
            };
        };

        for (let child of this.children){
            let component = child.getComponentByName( name );
            if(component !== undefined){
                return component;
            };
        };

        return undefined;
    };

    /**
     * Recursively attempts to retrieve a behavior with the given type from this entity or its children.
     * @param type The typeof behavior that needs to be retrieved.
     */
    public getBehavior<T extends TComponent>(type: new () => T): T{
        for(let behavior of this.behaviors){
            if(typeof behavior === typeof type){
                return behavior as T;
            };
        };

        for(let child of this.children){
            let behavior = child.getBehavior(type);
            if(behavior !== undefined){
                return behavior;
            };
        };

        return undefined;
    };

    /**
     * Recursively attempts to retrieve a component with the given type from this entity or its children.
     * @param type The typeof component that needs to be retrieved.
     */
    public getComponent<T extends TComponent>(type: new () => T): T{
        for(let component of this.components){
            if(component instanceof type){
                return component as T;
            };
        };

        for(let child of this.children){
            let component = child.getComponent(type);
            if(component !== undefined){
                return component;
            };
        };

        return undefined;
    };

    /* 
    * Calls start method of children, behaviors, and components before game loop.
    */
    start(): void{
        for(let b of this.behaviors){
            b.start();
        };

        for(let c of this.components){
            c.start();
        };

        for(let c of this.children){
            c.start();
        };
    };

    /**
     * Called on every frame.
     * @param dt The amount of time since the last update call.
     */ 
    update(dt: number): void {
        for(let b of this.behaviors){
            b.update(dt);
        }; 

        for(let c of this.components){
            c.update(dt);
        };

        for(let c of this.children){
            c.update(dt);
        };
    };


    /**
     * Renders this entity's components and children.
     * @param renderProps The engine properties of the renderer.
     */
    render(renderProps: RendererProps): void {
        for(let c of this.components){
            c.render(renderProps);
        };

        for(let c of this.children){
            c.render(renderProps);
        };
    };
}; 
