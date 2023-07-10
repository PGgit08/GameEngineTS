import { Engine } from "./Engine";
import { GameObject } from "../core/ecs/GameObject";

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
     */
    load(): void;

    /**
     * Called ONCE per loop frame UPDATE.
     */
    update(): void;

    /**
     * Called ONCE per loop frame RENDER (IS NOT TO BE USED BY {@link Behavior} classes).
     */
    render(): void;
}
