import { Engine } from "./Engine";
import { GameObject } from "../core/ecs/GameObject";
import { Behavior } from "../core/ecs/Behavior";

/**
 * Defines the {@link Engine} lifecycle methods. {@link GameObject} classes that implement this interface have their Lifecycle methods
 * called either when their parent/owner GameObject has their Lifecycle methods called, or when the Engine has its Lifecycle methods called.
 * The {@link load} method however can be called either during the LOAD period or when the GameObject is being loaded.
 * 
 * @interface Lifecycle
 */
export interface Lifecycle {
    /**
     * Called after GameObject's creating during the LOAD period, OR after the GameObject's initialization once
     * it is added into the hierarchy. 
     * 
     * @returns {void}
     */
    load(): void;

    /**
     * Called ONCE per loop frame UPDATE.
     * 
     * @returns {void}
     */
    update(): void;

    /**
     * Called ONCE per loop frame RENDER (IS NOT TO BE USED BY {@link Behavior} classes).
     * 
     * @returns {void}
     */
    render(): void;

    /**
     * Called during UNLOAD period, OR after GameObject's removal from the hierarchy.
     * 
     * @returns {void}
     */
    unload(): void;
}
