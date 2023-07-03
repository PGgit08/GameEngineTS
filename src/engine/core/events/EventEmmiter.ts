import Dictionary from "../../extra/Dictionary";
import { NameRegistrar } from "../helpers/NameRegistrar";
import { Event } from "./Event";
import { EventData } from "./EventData";
import { IEventEmmiter } from "./IEventEmmiter";

export class EventEmmiter extends NameRegistrar implements IEventEmmiter {
    private _events: Dictionary<string, Event<any>> = {}

    constructor() {
        super("EventEmmiter");
    }

    public addEvent(event: Event<any>): void {
        this.registerName(event.name);
        this._events[event.name] = event;
    }

    public subscribe<T>(eventName: string, subscriber: (eventData: EventData<T>) => void): string {
        return this._events[eventName].subscribe(subscriber);
    }

    public unSubscribe(eventName: string, subscriberId: string): void {
        this._events[eventName].unSubscribe(subscriberId);
    }
}
