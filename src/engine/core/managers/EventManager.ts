import Dictionary from "../../extra/Dictionary";
import { Event } from "../events/Event";
import { EventData } from "../events/EventData";
import { Manager } from "./Manager";

export class EventManager extends Manager {
    private static _instance: EventManager;

    private _gameEvents: Dictionary<string, Event<any>> = {}

    public static getInstance(): EventManager {
        if (!this._instance) {
            this._instance = new EventManager();
        }

        return this._instance;
    }

    private constructor() { super(); }

    public addEvent(event: Event<any>) {
        this.registerName(event.name);
        this._gameEvents[event.name] = event;
    }

    public subscribeTo<T>(eventName: string, subscriber: (eventData: EventData<T>) => void): void {
        this._gameEvents[eventName].subscribe(subscriber);
    }
}
