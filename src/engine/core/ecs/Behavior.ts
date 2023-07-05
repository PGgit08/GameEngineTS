import { Component } from "./Component";

/**
 * @classdesc
 * This class is very similar to it's parent class {@link Component}, however its {@link render} Lifecycle method does not get called
 * by its parent Entity.
 * 
 * @class Behavior
 * @abstract
 * @extends Component
 * 
 * @param {string} name - The name of this Behavior. 
 */
export abstract class Behavior extends Component {
    constructor(name: string) {
        super(name);
    }
    
    public abstract update(): void;
    public override render(): void {}
}
