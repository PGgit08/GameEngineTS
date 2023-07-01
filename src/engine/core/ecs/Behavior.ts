import { Component } from "./Component";

export abstract class Behavior extends Component {
    constructor(name: string) {
        super(name);
    }
    

    public abstract update(): void;
    public override render(): void {}
}
