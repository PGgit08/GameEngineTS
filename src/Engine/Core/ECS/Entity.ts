import { GameObject } from '@ecs/GameObject';
import { Component } from '@ecs/Component/Component';
import { Transform } from '@physics/Transform';
import { Behavior } from '@ecs/Behavior/Behavior';
import { GLMatrix4 } from '@gl/GLMatrix4';

/**
 * The base of any object in the game.
 */
export class Entity extends GameObject {
    name: string;

    children: Entity[] = [];
    parent: Entity;

    components: Component[] = [];
    behaviors: Behavior[] = [];
    
    protected _visible: boolean = true;

    // the world/local transforms of the entity
    public Transform: Transform = new Transform();

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

    public get worldMatrix(): GLMatrix4 {
        return this._worldMatrix;
    };

    public get localMatrix(): GLMatrix4 {
        return this._localMatrix;
    };

    public get isLoaded(): boolean {
        return this._isLoaded;
    };

    /**
     * Creates a new entity.
     * @param name The name of the entity.
     * @param components An optional parameter for adding a list of components to this Entity.
     */
    constructor(name: string, components?: Component[], behaviors?: Behavior[]){
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
    public addBehavior(behavior: Behavior): void {
        behavior.setOwner(this);
        this.behaviors.push(behavior);
    };

    /**
     * Adds a component to this entity.
     * @param component The component that needs to be added to the entity.
     */
    public addComponent(component: Component): void {
        component.setOwner(this);
        this.components.push(component);
    };

    /**
     * Adds a child to the entity.
     * @param child The child entity that needs to be added to this entity.
     */
    public addChild(child: Entity): void {
        child.parent = this;
        this.children.push(child);
    };

    /**
    * Recursively attempts to retrieve a child entity with the given name from this entity or its children.
    * @param name The name of the entity to retrieve.
    */
    public geEntityByName(name: string): Entity {
        if (this.name === name){
            return this;
        };

        for (let child of this.children){
            let result = child.geEntityByName(name);
            if (result !== undefined){
                return result;
            };
        };

        return undefined;
    };

    /**
    * Recursively attempts to retrieve a behavior with the given name from this entity or its children.
    * @param name The name of the behavior to retrieve.
    */
    public geBehaviorByName(name: string): Behavior {
        for (let behavior of this.behaviors){
            if (behavior.name === name){
                return behavior;
            };
        };

        for (let child of this.children){
            let behavior = child.geBehaviorByName( name );
            if (behavior !== undefined){
                return behavior;
            };
        };

        return undefined;
    };
    
    /**
     * Recursively attempts to retrieve a component with the given name from this entity or its children.
     * @param name The name of the component to retrieve.
     */
    public geComponentByName(name: string): Component {
        for (let component of this.components){
            if(component.name === name){
                return component;
            };
        };

        for (let child of this.children){
            let component = child.geComponentByName( name );
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
    public geBehavior<T extends Behavior>(type: new () => T): T {
        for(let behavior of this.behaviors){
            if(typeof behavior === typeof type){
                return behavior as T;
            };
        };

        for(let child of this.children){
            let behavior = child.geBehavior(type);
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
    public geComponent<T extends Component>(type: new () => T): T {
        for(let component of this.components){
            if(component instanceof type){
                return component as T;
            };
        };

        for(let child of this.children){
            let component = child.geComponent(type);
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
     * Called on every frame.(recursive)
     * @param dt The amount of time since the last update call(deltaTime).
     */ 
    update(): void {
        this.getWorldMatrix();

        for(let b of this.behaviors){
            b.update();
        }; 

        for(let c of this.components){
            c.update();
        };

        for(let c of this.children){
            c.update();
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
        this._localMatrix = this.Transform.toMatrix();

        if(this.parent && this.parent.visible){
            // incase this entity has a visible entity 
            // multiply the parent's world matrix by this entity's local matrix
            this._worldMatrix = GLMatrix4.mul(
                this.parent.worldMatrix,
                this._localMatrix
            );
        }

        else {
            // incase this entity does not have a visible parent entity
            // multiply it's local matrix by it's world matrix
            this._worldMatrix = this._localMatrix;
        };
    };
}; 
