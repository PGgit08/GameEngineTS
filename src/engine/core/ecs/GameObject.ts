export class GameObject {
    private static GLOBAL_ID: number = 0;
    private _id: number;

    /**
     * The unique ID of this GameObject
     */
    get id(): number {
        return this._id;
    }

    constructor() {
        this._id = GameObject.GLOBAL_ID++;
    }
}
