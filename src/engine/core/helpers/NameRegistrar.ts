import { GameObject } from "../ecs/GameObject";

/**
 * A class that can register GameObjects with unique names.
 */
export class NameRegistrar extends GameObject {
    private _registeredNames: string[] = [];

    constructor(name: string) {
        super(name, true);
    }

    public static FindDuplicates(arr: any[]): boolean {
        return arr.filter((item, index) => arr.indexOf(item) !== index).length !== 0;
    }

    protected registerName(name: string): void {
        if (this._registeredNames.includes(name)) {
            throw new Error("Duplicate '" + name + "' found!");
        }

        this._registeredNames.push(name);
    }
}