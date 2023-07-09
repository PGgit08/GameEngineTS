import Dictionary from "../../types/Dictionary";
import { GameObject } from "../ecs/GameObject";

/**
 * @classdesc
 * A GameObject that can register GameObjects with unique names into individual registers. This class is meant to be extended.
 * 
 * @class NameRegistrar
 * @extends GameObject
 * 
 * @param {string} name - The name of this NameRegistrar.
 */
export class NameRegistrar extends GameObject {
    private _registers: Dictionary<number, string[]> = { 0: [] };

    constructor(name: string) {
        super(name);
    }

    /**
     * A helper function checks any array for duplicate values.
     * 
     * @static
     * 
     * @param {any[]} arr - The array to check.
     * 
     * @returns {boolean} True if the array has duplicate values, False if no.
     */
    public static FindDuplicates(arr: any[]): boolean {
        return arr.filter((item, index) => arr.indexOf(item) !== index).length !== 0;
    }

    /**
     * Adds a new register to this NameRegistrar.
     * 
     * @returns {number} - The index of the register in this NameRegistrar.
     */
    protected createRegister(): number {
        const key = Object.keys(this._registers).length;

        this._registers[key] = [];

        return key;
    }

    /**
     * Registers a name to a register in this NameRegistrar.
     * 
     * @param {string} name - The name to register.
     * @param {number} register - The register index to add the name to (DEFAULT IS 0).
     */
    protected registerName(name: string, register: number = 0): void {
        if (this._registers[register] === undefined) return;

        if (this._registers[register].includes(name)) {
            throw new Error("Duplicate '" + name + "' found!");
        }

        this._registers[register].push(name);
    }

    /**
     * Unregisters a name from a register in this NameRegistrar.
     *  
     * @param {string} name - The name to unregister.
     * @param {number} register - The register index to remove the name from (DEFAULT IS 0).
     */
    protected unregisterName(name: string, register: number = 0): void {
        if (this._registers[register] === undefined) return;

        if (this._registers[register].includes(name)) {
            this._registers[register].splice(
                this._registers[register].indexOf(name),
                1
            );
        }
    }
}