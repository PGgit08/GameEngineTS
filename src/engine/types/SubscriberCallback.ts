import { EventData } from "../core/events/EventData";

export type SubscriberCallback<T> = (eventData: EventData<T>) => any;
