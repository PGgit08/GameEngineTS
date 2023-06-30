/**
 * Defines the GETS lifecycle methods.
 */
export interface Lifecycle {
    /**
     * Called after GameObject's initialization once it is added into the hierarchy. 
     */
    load(): void;

    /**
     * Called periodically, per frame update, and is used to update components and behaviors.
     */
    update(): void;

    /**
     * Called periodically, per frame update, and is used render components. (SHOULD NOT BE USED BY BEHAVIORS)
     */
    render(): void;
}
