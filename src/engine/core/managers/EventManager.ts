import Dictionary from "../../types/Dictionary";
import { Event } from "../events/Event";
import { EventData } from "../events/EventData";
import { EventEmmiter } from "../events/EventEmmiter";

/**
 * @classdesc
 * A {@link EventEmmiter} singleton class that holds {@link Event} classes. 
 * If an Event is created without a given parent EventEmmiter, they are automatically added to this manager.
 * 
 * @class EventManager
 * @extends EventEmmiter
 * 
 * @hideconstructor
 */
export class EventManager extends EventEmmiter {
    private static _instance: EventManager;

    private _gameEvents: Dictionary<string, Event<any>> = {}

    /**
     * @returns {EventManager} The single instance of the {@link EventManager}. 
     */
    public static getInstance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }

        return this._instance;
    }

    private constructor() { super("EventManager"); }

    public override addEvent(event: Event<any>) {
        this.registerName(event.name);
        this._gameEvents[event.name] = event;
    }

    public override subscribe<T>(eventName: string, subscriber: (eventData: EventData<T>) => void): string {
        return this._gameEvents[eventName].subscribe(subscriber);
    }

    public override unSubscribe(eventName: string, subscriberId: string): void {
        this._gameEvents[eventName].unSubscribe(subscriberId);
    }
}
