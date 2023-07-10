/**
 * Converts an angle from degress to radians.
 * 
 * @param {number} deg - The angle in degrees.
 *  
 * @returns {number} The angle in radians. 
 */
function degToRadians(deg: number): number {
    return deg * (Math.PI / 180);
}

/**
 * Converts an angle from radians to degrees.
 * 
 * @param {number} rad - The angle in radians.
 * 
 * @returns {number} The angle in degrees. 
 */
function radiansToDeg(rad: number): number {
    return rad / (Math.PI / 180);
}

/**
 * Checks whether a given number is a power of 2.
 * 
 * @param {number} num - The given number.  
 * 
 * @returns {boolean} True if the number is a power of 2, False if not.
 */
function isPowerOf2(num: number): boolean {
    if (num == 0) { return false; }
    return (num & num - 1) === 0;
}

export { degToRadians, radiansToDeg, isPowerOf2 };
