import { v4 } from 'uuid';

export class GameObject {
    private readonly _id: string;
    private readonly _name: string;

    /**
     * The unique ID of this GameObject
     */
    get id(): string {
        return this._id;
    }

    /**
     * The name of this Gameobject (CAN BE UNIQUE)
     */
    get name(): string {
        return this._name;
    }   

    constructor(name: string, nameCheck: boolean = false) {        
        this._id = v4();
        this._name = name;

        if (this.constructor.toString().match(/\w+/g)[1] !== this._name && nameCheck) {
            throw new Error("GameObject name and class name do not match");
        }
    }
}
