import { Event } from "./Event";
import { EventData } from "./EventData";

export interface IEventEmmiter {
    /**
     * Adds an Event to this EventEmmiter.
     * @param event The Event to add to this EventEmmiter.
     */
    addEvent(event: Event<any>): void;

    /**
     * Subscribes to an Event in this EventEmmiter.
     * @param eventName The name of the Event to subscribe to.
     * @param subscriber The callback which is triggered whenever the Event is invoked.
     * @returns The Id of this subscriber.
     */
    subscribe<T>(eventName: string, subscriber: (eventData: EventData<T>) => void): string;

    /**
     * Unsubscribes a subscription from an Event.
     * @param eventName The name of the Event.
     * @param subscriberId The Id of the subscriber.
     */
    unSubscribe(eventName: string, subscriberId: string): void;
}
