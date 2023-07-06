export interface EventData<T> {
    emmiterName: string;
    eventName: string;
    data: T;
}
