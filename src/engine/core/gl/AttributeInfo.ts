export interface AttributeInfo {
    /** The location of this attribute in the shader */
    location: number;

    /** The size of the attribute (1-4, ex: Vector2 -> 2) */
    size: number;

    /** The offset of the attribute from the start of the buffer */
    offset: number;
}
