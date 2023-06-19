import { GameObject } from "../ecs/GameObject";
import { EventData } from "./EventData";

export class Event<T extends EventData> extends GameObject {
    private _subscribers: ((data: T) => void)[] = [];

    constructor(name: string) {
        super(name);
    }

    public invoke(data?: T): void {
        // add stuff here later
    }

    public subscribe(callback: (data: T) => void): void {
        this._subscribers.push(callback);
    }
}
