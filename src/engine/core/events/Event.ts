import { v4 } from "uuid";
import Dictionary from "../../extra/Dictionary";
import { GameObject } from "../ecs/GameObject";
import { EventManager } from "../managers/EventManager";
import { EventData } from "./EventData";
import { EventEmmiter } from "./EventEmmiter";

export class Event<T> extends GameObject {
    // id: subscriber
    private _subscribers: Dictionary<string, ((eventData: EventData<T>) => void)> = {};

    public readonly eventEmmiter: EventEmmiter;

    /**
     * A field describing whether this Event is enabled. If it is set to False, the Event will will not invoke its subscribers
     * when it is invoked.
     */
    public enabled: boolean = true;

    constructor(name: string, eventEmmiter?: EventEmmiter) {
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
        if (!this.enabled) return;

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