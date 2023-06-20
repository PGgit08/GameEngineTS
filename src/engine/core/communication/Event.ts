import { GameObject } from "../ecs/GameObject";
import { EventData } from "./EventData";

export class Event<T> extends GameObject {
    private _subscribers: ((data: EventData<T>) => void)[] = [];

    constructor(name: string) {
        super(name);
    }

    public invoke(data: T): void {
        const eventData: EventData<T> = {
            eventName: this.name,
            data: data
        }

        this._subscribers.forEach((subscriber) => {
            subscriber(eventData);
        });
    }

    public subscribe(callback: (data: EventData<T>) => void): void {
        this._subscribers.push(callback);
    }
}
