import { v4 } from "uuid";
import Dictionary from "../../types/Dictionary";
import { GameObject } from "../ecs/GameObject";
import { EventManager } from "../managers/EventManager";
import { EventData } from "./EventData";
import { EventEmmiter } from "./EventEmmiter";
import { SubscriberCallback } from "../../types/SubscriberCallback";

/**
 * @classdesc
 * A GameObject that represents an event which can be subscribed to and unsubscribed from by subscriber callbacks. Whenever this Event
 * gets invoked it invokes all of its subscribers. 
 * 
 * @class Event
 * @extends GameObject
 * @template {any} T
 * 
 * @param {string} name - The name of this Event.
 * @param {EventEmmiter} [eventEmmiter] - The EventEmmiter this Event belongs to (DEFAULT IS {@link EventManager}).
 */
export class Event<T> extends GameObject {
    // id: subscriber
    private _subscribers: Dictionary<string, SubscriberCallback<T>> = {};

    /** The {@link EventEmmiter} this Event belongs to. */
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

    /**
     * Invokes this Event that if enabled, will invoke all of the subscribers of this event and pass in a {@link EventData} object
     * into each subscriber callback when it is invoked.
     * 
     * @param {T} data The data to pass into the subscribers of this Event when they are invoked.
     */
    public invoke(data: T): void {
        if (!this.enabled) return;

        const eventData: EventData<T> = {
            emmiterName: this.eventEmmiter.name,
            eventName: this.name,
            data: data
        }

        Object.values(this._subscribers).forEach((subscriber) => {
            subscriber(eventData);
        });
    }

    /**
     * Subscribes a subscriber callback to this Event.
     * @param {SubscriberCallback} callback - The subscriber callback that gets subscribed to this Event.
     * @returns The id of the subscription.
     */
    public subscribe(callback: SubscriberCallback<T>): string {
        const id = v4();
        this._subscribers[id] = callback;

        return id;
    }

    /**
     * Unscribes a subscriber from this Event.
     * @param {string} id - The id of the subscription.
     */
    public unSubscribe(id: string): void {
        delete this._subscribers[id];
    }
}