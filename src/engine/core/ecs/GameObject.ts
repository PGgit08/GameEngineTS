import { v4 } from 'uuid';

export default class GameObject {
    private readonly _id: string;
    private readonly _name: string;

    private _registeredNames: string[] = [];

    /**
     * The unique ID of this GameObject
     */
    get id(): string {
        return this._id;
    }

    /**
     * The name of this Gameobject (NOT ALWAYS UNIQUE)
     */
    get name(): string {
        return this._name;
    }   

    constructor(name: string, uniqueName: boolean = false) {        
        if (this._registeredNames.includes(name) && uniqueName) {
            throw new Error("GameObject with identical name already exists");
        }

        this._id = v4();
        this._name = name;

        this._registeredNames.push(this._name);
    }
}
