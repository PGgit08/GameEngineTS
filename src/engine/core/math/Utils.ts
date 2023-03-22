function degToRadians(deg: number): number {
    return deg * (Math.PI / 180);
}

function radiansToDeg(rad: number): number {
    return rad / (Math.PI / 180);
}

function isPowerOf2(num: number): boolean {
    if (num == 0) { return false; }
    return (num & num - 1) == 0;
}

export { degToRadians, radiansToDeg, isPowerOf2 };
