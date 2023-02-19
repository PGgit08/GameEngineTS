/**
 * Defines the GETS lifecycle methods.
 */
export interface Lifecycle {
    /**
     * Called once at the start of the program.
     */
    start(): void;

    /**
     * Called periodically, and is used to update components and behaviors.
     */
    update(): void;

    /**
     * Called periodically, and is used render components. (SHOULD NOT BE USED BY BEHAVIORS)
     */
    render(): void;
}
