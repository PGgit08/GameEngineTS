import { v4 } from 'uuid';

/**
 * @classdesc
 * The base class for all non-static classes in the Engine. All GameObjects have a name and a unique generated id.
 * 
 * @class GameObject
 * 
 * @param {string} name - The name of this GameObject.
 * @param {boolean} [nameCheck] - A flag that if True enforces the class name and name of this GameObject to match (DEFAULT: False).
 */
export class GameObject {
    private  _id: string;
    private readonly _name: string;
    private readonly _nameCheck: boolean;

    /**
     * @returns {string} The unique id of this GameObject
     */
    get id(): string {
        return this._id;
    }

    /**
     * @returns {string} The name of this Gameobject.
     */
    get name(): string {
        return this._name;
    }   

    constructor(name: string, nameCheck: boolean = false) {        
        this._id = v4();
        this._name = name;
        this._nameCheck = nameCheck;

        if (this.constructor.toString().match(/\w+/g)[1] !== this._name && this._nameCheck) {
            throw new Error("GameObject name and class name do not match.");
        }
    }
}
