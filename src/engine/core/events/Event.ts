import { GameObject } from "../ecs/GameObject";
import { EventManager } from "../managers/EventManager";
import { EventData } from "./EventData";

export class Event<T> extends GameObject {
    private _subscribers: ((eventData: EventData<T>) => void)[] = [];

    constructor(name: string) {
        super(name);

        EventManager.getInstance().addEvent(this);
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

    public subscribe(callback: (eventData: EventData<T>) => void): void {
        this._subscribers.push(callback);
    }
}
