/**
 * Defines the GETS lifecycle methods.
 */
export interface Lifecycle {
    /**
     * Called once during load period, and once during Entity Spawn.
     */
    load(): void;

    /**
     * Called ONLY ONCE after loading period.
     */
    start(): void;

    /**
     * Called periodically, per frame update, and is used to update components and behaviors.
     */
    update(): void;

    /**
     * Called periodically, per frame update, and is used render components. (SHOULD NOT BE USED BY BEHAVIORS)
     */
    render(): void;
}
