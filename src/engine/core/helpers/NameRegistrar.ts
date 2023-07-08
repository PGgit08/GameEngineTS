import Dictionary from "../../types/Dictionary";
import { GameObject } from "../ecs/GameObject";

/**
 * A class that can register GameObjects with unique names.
 */
export class NameRegistrar extends GameObject {
    private _registers: Dictionary<number, string[]> = { 0: [] };

    constructor(name: string) {
        super(name);
    }

    public static FindDuplicates(arr: any[]): boolean {
        return arr.filter((item, index) => arr.indexOf(item) !== index).length !== 0;
    }

    protected createRegister(): number {
        const key = Object.keys(this._registers).length;

        this._registers[key] = [];

        return key;
    }

    protected registerName(name: string, register: number = 0): void {
        if (this._registers[register] === undefined) return;

        if (this._registers[register].includes(name)) {
            throw new Error("Duplicate '" + name + "' found!");
        }

        this._registers[register].push(name);
    }

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