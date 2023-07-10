import { EventData } from "../core/events/EventData";

import { Event } from "../core/events/Event";

/**
 * A callback that represents a subscriber to a {@link Event} which gets invoked whenever the Event it belongs to is invoked.
 * 
 * @template {any} T
 * 
 * @param {EventData<T>} eventData - The data sent into the subscriber callback from the Event it belongs to.
 * 
 * @returns {any} Anything the user desires.
 */
export type SubscriberCallback<T> = (eventData: EventData<T>) => any;
