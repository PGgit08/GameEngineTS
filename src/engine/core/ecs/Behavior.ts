import { Component } from "./Component";

/**
 * @classdesc
 * This class is identical to it's parent class {@link Component}, however its {@link render} Lifecycle method does not get called
 * by its parent Entity.
 * 
 * @class Behavior
 * @extends Component
 * @abstract
 * 
 * @param {string} name - The name of this Behavior. 
 */
export abstract class Behavior extends Component {
    public enabled: boolean = true;

    constructor(name: string) {
        super(name);
    }
    
    public abstract update(): void;
    public override render(): void {}
}
