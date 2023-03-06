import { mat3, vec2 } from "gl-matrix";
import { degToRadians } from "./Utils";

export class Transform {
    public position: vec2 = vec2.create();
    public rotation: number = 0;
    public scale: vec2 = vec2.fromValues(1, 1);

    /**
     * Translate the object.
     * @param v The vec2 to translate the object by.
     */
    public translate(v: vec2): void {
        this.position = vec2.fromValues(this.position[0] + v[0], this.position[1] + v[1]);
    }

    /**
     * Translate the object along its local X/Y axis.
     * @param v The vec2 to translate the object by.
     */
    public localTranslate(v: vec2): void {
        this.translate(this.localDirection(v));
    }

    /**
     * Rotate the object.
     * @param d The degrees to rotate the object by.
     */
    public rotate(d: number): void {
        this.rotation += d;
    }

    /**
     * Changes a vector from world-space to local-space.
     * @param directionVector The world-space vector.
     * @returns The world-space vector in the Entity's local-space.
     */
    public localDirection(directionVector: vec2): vec2 {
        const localDirection: vec2 = vec2.create();
        const rotMat: mat3 = mat3.create();

        mat3.fromRotation(rotMat, degToRadians(this.rotation));
        vec2.transformMat3(localDirection, directionVector, rotMat);

        return localDirection;
    }

    /**
     * (DO NOT USE YET, BEING DEVELOPED). Rotates the transform around a point.
     * @param point The point to rotate around.
     */
    public rotateAround(point: vec2): void {

    }

    /**
     * (DO NOT USE YET, BEING DEVELOPED). Rotate the transform so it looks at a point.
     * @param point The point to look at.
     */
    public lookAt(point: vec2): void {

    }

    /**
     * Converts this Transform into a 3x3 Matrix.
     * @returns A mat3 3x3 Matrix.
     */
    public toMatrix(): mat3 {
        const transMat: mat3 = mat3.create();
        const rotMat: mat3 = mat3.create();
        const scaleMat: mat3 = mat3.create();

        const outMat: mat3 = mat3.create();

        mat3.fromTranslation(transMat, this.position);
        mat3.fromRotation(rotMat, degToRadians(this.rotation));
        mat3.fromScaling(scaleMat, this.scale);

        // ORDER OF TRANSFORMATION -> scale point, rotate scaled, translate rotated scaled
        // MATRIX MULTIPLICATION -> do it in reverse because the matrix closest to point is the "function" that's first applied

        mat3.mul(outMat, transMat, rotMat);
        mat3.mul(outMat, outMat, scaleMat);

        return outMat;
    }
}
