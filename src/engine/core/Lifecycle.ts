/**
 * Defines the GETS lifecycle methods.
 */
export interface Lifecycle {
    /**
     * Called once before start, loads everything from an AssetManager(NOT MADE YET)
     */
    load(): void;

    /**
     * Called once after loading.
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
