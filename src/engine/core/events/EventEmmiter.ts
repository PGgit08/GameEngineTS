import Dictionary from "../../types/Dictionary";
import { SubscriberCallback } from "../../types/SubscriberCallback";
import { NameRegistrar } from "../helpers/NameRegistrar";
import { Event } from "./Event";

/**
 * @classdesc
 * A NameRegistrar which holds {@link Event} classes. Events can be added to this Event Emmiter and 
 * any subscriber callbacks can subscribe/unsubscribe to an Event that belongs to this
 * EventEmmiter.
 * 
 * @class EventEmmiter
 * @extends NameRegistrar
 * 
 * @param {string} name - The name of this EventEmmiter.
 */
export class EventEmmiter extends NameRegistrar {
    private _events: Dictionary<string, Event<any>> = {}

    constructor(name: string) {
        super(name);
    }

    /**
     * Adds an Event to this EventEmmiter.
     * 
     * @param event The Event to add to this EventEmmiter.
     */
    public addEvent(event: Event<any>): void {
        this.registerName(event.name);
        this._events[event.name] = event;
    }

    /**
     * Subscribes a subscriber callback to an Event in this EventEmmiter.
     * 
     * @param {string} eventName - The name of the Event to subscribe to.
     * @param {SubscriberCallback} subscriber - The subscriber callback which is invoked whenever the Event is invoked.
     * 
     * @returns The id of this subscription.
     */
    public subscribe<T>(eventName: string, subscriber: SubscriberCallback<T>): string {
        if (this._events[eventName] === undefined) throw new Error(`Can not find Event ${eventName} in this EventEmmiter.`);

        return this._events[eventName].subscribe(subscriber);
    }

    /**
     * Unsubscribes a subscriber callback from an Event.
     * 
     * @param {string} eventName - The name of the Event.
     * @param {string} subscriberId - The id of the subscription.
     */
    public unSubscribe(eventName: string, subscriberId: string): void {
        if (this._events[eventName] === undefined) throw new Error(`Can not find Event ${eventName} in this EventEmmiter.`);

        this._events[eventName].unSubscribe(subscriberId);
    }
}
