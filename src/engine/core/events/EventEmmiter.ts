import Dictionary from "../../extra/Dictionary";
import { NameRegistrar } from "../helpers/NameRegistrar";
import { Event } from "./Event";
import { EventData } from "./EventData";

export class EventEmmiter extends NameRegistrar {
    private _events: Dictionary<string, Event<any>> = {}

    constructor(name: string) {
        super(name);
    }

    /**
     * Adds an Event to this EventEmmiter.
     * @param event The Event to add to this EventEmmiter.
     */
    public addEvent(event: Event<any>): void {
        this.registerName(event.name);
        this._events[event.name] = event;
    }

    /**
     * Subscribes to an Event in this EventEmmiter.
     * @param eventName The name of the Event to subscribe to.
     * @param subscriber The callback which is invoked whenever the Event is invoked.
     * @returns The id of this subscriber.
     */
    public subscribe<T>(eventName: string, subscriber: (eventData: EventData<T>) => void): string {
        return this._events[eventName].subscribe(subscriber);
    }

    /**
     * Unsubscribes a subscriber from an Event.
     * @param eventName The name of the Event.
     * @param subscriberId The id of the subscriber.
     */
    public unSubscribe(eventName: string, subscriberId: string): void {
        this._events[eventName].unSubscribe(subscriberId);
    }
}
