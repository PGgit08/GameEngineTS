import { v4 } from 'uuid';

export class GameObject {
    private _id: string;

    /**
     * The unique ID of this GameObject
     */
    get id(): string {
        return this._id;
    }

    constructor() {
        this._id = v4();
    }
}
