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

    constructor(name: string) {        
        this._id = v4();
        this._name = name;
    }
}
