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
    
    // boolean stating whether this class gets rendered or not
    protected _visible: boolean = true;

    // boolean stating whether the children of this class have a relative position to their parent(this class)
    protected _relativeChildren: boolean = true;

    // the world/local transforms of the entity
    public Transform: Transform = new Transform();

    // same for the matricies
    protected _worldMatrix: GLMatrix4 = GLMatrix4.identity();
    protected _localMatrix: GLMatrix4 = GLMatrix4.identity();

    public get visible(): boolean {
        return this._visible;
    };

    public set visible(v: boolean) {
        this._visible = v;
    };


    public get relativeChildren(): boolean {
        return this._relativeChildren;
    };

    public set relativeChildren(rC: boolean) {
        this._relativeChildren = rC;
    };


    public get worldMatrix(): GLMatrix4 {
        return this._worldMatrix;
    };

    public get localMatrix(): GLMatrix4 {
        return this._localMatrix;
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
    public getEntityByName(name: string): Entity {
        if (this.name === name){
            return this;
        };

        for (let child of this.children){
            let result = child.getEntityByName(name);
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
    public getBehaviorByName(name: string): Behavior {
        for (let behavior of this.behaviors){
            if (behavior.name === name){
                return behavior;
            };
        };

        for (let child of this.children){
            let behavior = child.getBehaviorByName( name );
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
    public getComponentByName(name: string): Component {
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
    public getBehavior<T extends Behavior>(type: new () => T): T {
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
    public getComponent<T extends Component>(type: new () => T): T {
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
    start(): void {
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
        // if this entity is meant to be rendered then render it
        if(this._visible){
            for(let c of this.components){
                c.render();
            };
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

        // if the parent entity wants its children to be relative to its position
        if(this.parent && this.parent.relativeChildren){
            this._worldMatrix = GLMatrix4.mul(
                this.parent.worldMatrix,
                this._localMatrix
            );
        }

        // if the parent entity doesn't want its children to be relative to its position
        else {
            this._worldMatrix = this._localMatrix;
        };
    };
}; 
