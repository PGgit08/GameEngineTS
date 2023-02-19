import Lifecycle from "../Lifecycle";
import GameObject from "./GameObject";

export default abstract class Behavior extends GameObject implements Lifecycle {
    constructor(name: string) {
        super(name);
    }

    public abstract start(): void
    public abstract update(): void
    public render(): void {} // TO BE UNUSED BY SUBCLASSES
}
