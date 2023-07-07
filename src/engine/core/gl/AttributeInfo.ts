import { Buffer } from "./Buffer";
import { Shader } from "./shader/Shader";

/**
 * The info for an attribute that gets added to a {@link Buffer} object.
 * 
 * @interface AttributeInfo
 */
export interface AttributeInfo {
    /** The name of this attribute in the {@link Shader} it belongs to. @type {string} */
    name: string;

    /** The optional location of this attribute in the {@link Shader} it belongs to (AUTOMATICALLY FOUND BY GEOMETRY). @type {number} */
    location?: number;

    /** The size of the attribute (1-4, ex: Vector2 -> 2). @type {number} */
    size: number;

    /** The name of the {@link Buffer} that this attribute belongs to. @type {string} */
    buffer: string;
}
