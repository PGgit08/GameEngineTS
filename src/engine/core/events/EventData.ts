import { EventEmmiter } from "./EventEmmiter";
import { Event } from "./Event";

/**
 * Represents the data that gets passed into subscriber callbacks of a {@link Event} when they are invoked.
 * 
 * @interface EventData
 * @template {any} T
 */
export interface EventData<T> {
    /** The name of the {@link EventEmmiter} this subscriber's parent Event belongs to. @type {string} */
    emmiterName: string;

    /** The name of the parent Event of this subscriber. @type {string} */
    eventName: string;

    /** The actual data that gets passed into this subscriber when it is invoked @type {T} */
    data: T;
}
