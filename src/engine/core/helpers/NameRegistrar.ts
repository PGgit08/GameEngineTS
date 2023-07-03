import { GameObject } from "../ecs/GameObject";

/**
 * A class that can register GameObjects with unique names.
 */
export class NameRegistrar extends GameObject {
    private _registeredNames: string[] = [];

    constructor(name: string) {
        super(name, true);
    }

    protected registerName(name: string): void {
        if (this._registeredNames.includes(name)) {
            throw new Error("Duplicate '" + name + "' found!");
        }

        this._registeredNames.push(name);
    }
}