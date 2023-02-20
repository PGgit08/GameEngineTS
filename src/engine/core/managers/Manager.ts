/**
 * A Singleton class that can register GameObjects with unique names.
 */
export class Manager {
    private _registeredNames: string[] = [];

    protected constructor() {}

    protected registerName(name: string): void {
        if (this._registeredNames.includes(name)) {
            throw new Error("Duplicate '" + name + "' found!");
        }

        this._registeredNames.push(name);
    }
}