import { TGameObject } from '@ecs/TGameObject';
import { TComponent } from '@ecs/Component/IComponent';

import { Transform } from '@physics/Transform';
import { TBehavior } from '@ecs/Behavior/IBehavior';
import { GLMatrix4 } from '@gl/GLMatrix4';

export class TEntity extends TGameObject{
    name: string;

    children: TEntity[] = [];
    parent: TEntity;

    components: TComponent[] = [];
    behaviors: TBehavior[] = [];
    
    protected _visible: boolean = true;

    // will probably remove one transform later
    // just doing it with world/local transform for now
    public worldTransform: Transform = new Transform();
    public localTransform: Transform = new Transform();

    // same for the matricies
    protected _worldMatrix: GLMatrix4 = GLMatrix4.identity();
    protected _localMatrix: GLMatrix4 = GLMatrix4.identity();

    protected _isLoaded: boolean = false;

    public get visible(): boolean{
        return this._visible;
    };

    public set visible(v: boolean){
        this._visible = v;
    };

    public get worldMatrix(): GLMatrix4{
        return this._worldMatrix;
    };

    public get localMatrix(): GLMatrix4{
        return this._localMatrix;
    };

    public get isLoaded(): boolean{
        return this._isLoaded;
    };

    /**
     * Creates a new entity.
     * @param name The name of the entity.
     * @param components An optional parameter for adding a list of components to this Entity.
     */
    constructor(name: string, components?: TComponent[], behaviors?: TBehavior[]){
        super();
        this.name = name;
        
        if(components){
            for(const component of components){
                this.addComponent(component);
            };
        };

        if(behaviors){
            for(const behavior of behaviors){
                this.addBehavior(behavior);
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
    * Calls start method of children, behaviors, and components before game loop.(recursive)
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
     * Calls load method of children and components, sets this entity to LOADED.(recursive)
     */
    load(){
        for(let c of this.children){
            c.load();
        };

        for(let c of this.components){
            c.load();
        };

        this._isLoaded = true;
    };

    /**
     * Called on every frame.(recursive)
     * @param dt The amount of time since the last update call(deltaTime).
     */ 
    update(dt: number): void {
        this.getWorldMatrix();

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
     * Renders this entity's components and children.(recursive)
     * @param renderProps The engine properties of the renderer.
     */
    render(): void {
        for(let c of this.components){
            c.render();
        };

        for(let c of this.children){
            c.render();
        };
    };

    /**
     * Gets worldMatrix of this Entity based on parents
     */
    public getWorldMatrix(){
        this._worldMatrix = this.worldTransform.toMatrix();
        this._localMatrix = this.localTransform.toMatrix();

        if(this.parent && this.parent.visible){
            this._worldMatrix = GLMatrix4.mul(
                this.parent.worldMatrix,
                this.localMatrix
            );
        };
    };
}; 
