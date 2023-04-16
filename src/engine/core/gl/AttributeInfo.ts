export interface AttributeInfo {
    /** The name of this attribute in the shader. */
    name: string;

    /** The location of this attribute in the shader (AUTOMATICALLY FOUND BY GEOMETRY). */
    location?: number;

    /** The size of the attribute (1-4, ex: Vector2 -> 2). */
    size: number;

    /** The name of the buffer that this Attribute belongs to. */
    buffer: string;
}
