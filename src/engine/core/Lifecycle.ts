/**
 * Defines the Engine's lifecycle methods.
 */
export interface Lifecycle {
    /**
     * Called after GameObject's initialization during loading period or once it is added into the hierarchy. 
     */
    load(): void;

    /**
     * Called periodically, per frame update, and is used to update components and behaviors.
     */
    update(): void;

    /**
     * Called periodically, per frame update, and is used render components. (IS NOT USED BY BEHAVIORS)
     */
    render(): void;
}
