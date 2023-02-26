import { v4 } from 'uuid';

export class GameObject {
    private  _id: string;
    private readonly _name: string;
    private readonly _nameCheck: boolean;

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
        this._nameCheck = nameCheck;

        if (this.constructor.toString().match(/\w+/g)[1] !== this._name && this._nameCheck) {
            throw new Error("GameObject name and class name do not match");
        }

        console.log(this.clone());
    }

    public clone(): GameObject {
        const clone: GameObject = Object.create(this);
        clone._id = v4();

        return clone;
    }
}
