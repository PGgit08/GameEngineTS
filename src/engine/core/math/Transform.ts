import { mat3, vec2 } from "gl-matrix";
import { degToRadians } from "./Utils";
import { Vector2 } from "./Vector2";

export class Transform {
    public position: Vector2 = Vector2.zero;
    public rotation: number = 0;
    public scale: Vector2 = Vector2.one;

    /**
     * Translate the object.
     * @param v The Vector2 to translate the object by.
     */
    public translate(v: Vector2): void {
        this.position.add(v);
    }

    /**
     * Rotate the object.
     * @param d The degrees to rotate the object by.
     */
    public rotate(d: number): void {
        this.rotation += d;
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

        mat3.fromTranslation(transMat, vec2.fromValues(this.position.x, this.position.y));
        mat3.fromRotation(rotMat, degToRadians(this.rotation));
        mat3.fromScaling(scaleMat, vec2.fromValues(this.scale.x, this.scale.y));

        // ORDER OF TRANSFORMATION -> scale point, rotate scaled, translate rotated scaled
        // MATRIX MULTIPLICATION -> do it in reverse because the matrix closest to point is the "function" that's first applied

        mat3.mul(outMat, transMat, rotMat);
        mat3.mul(outMat, outMat, scaleMat);

        return outMat;
    }
}
