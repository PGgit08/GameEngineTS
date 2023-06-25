import { v4 } from "uuid";
import Dictionary from "../../extra/Dictionary";
import { GameObject } from "../ecs/GameObject";
import { EventManager } from "../managers/EventManager";
import { EventData } from "./EventData";
import { IEventEmmiter } from "./IEventEmmiter";

export class Event<T> extends GameObject {
    // id: subscriber
    private _subscribers: Dictionary<string, ((eventData: EventData<T>) => void)> = {};

    public readonly eventEmmiter: IEventEmmiter;

    constructor(name: string, eventEmmiter?: IEventEmmiter) {
        super(name);

        if (eventEmmiter === undefined) {
            EventManager.getInstance().addEvent(this);
            this.eventEmmiter = EventManager.getInstance();
        } else {
            eventEmmiter.addEvent(this);
            this.eventEmmiter = eventEmmiter;
        }
    }

    public invoke(data: T): void {
        const eventData: EventData<T> = {
            eventName: this.name,
            data: data
        }

        Object.values(this._subscribers).forEach((subscriber) => {
            subscriber(eventData);
        });
    }

    public subscribe(callback: (eventData: EventData<T>) => void): string {
        const id = v4();
        this._subscribers[id] = callback;

        return id;
    }

    public unSubscribe(id: string): void {
        delete this._subscribers[id];
    }
}