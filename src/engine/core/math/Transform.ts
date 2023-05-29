import { mat3, vec2 } from "gl-matrix";
import { degToRadians, radiansToDeg } from "./Utils";
import { Entity } from "../ecs/Entity";

export class Transform {
    public position: vec2 = vec2.create();
    public rotation: number = 0;
    public scale: vec2 = vec2.fromValues(1, 1);

    public owner: Entity;

    /**
     * Gets the sum of the rotations of this Entity's parents.
     * @returns The sum of the rotations of this Entity's parents.
     */
    public get parentRotation(): number {
        let rotationSum: number = 0;

        let parent: Entity = this.owner.parent;
        let child: Entity = this.owner;

        while (parent && parent.relativeChildren) {
            if (child.relativeChild) {
                rotationSum += parent.transform.rotation;

                parent = parent.parent;
                child = parent;
            }
        }

        return rotationSum;
    }

    constructor(owner: Entity) {
        this.owner = owner;
    }

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
    public rotateAround(point: vec2): void {}

    /**
     * (DO NOT USE YET, BEING DEVELOPED). Sets the rotation so it looks at a point.
     * @param point The point to look at.
     */
    public lookAt(point: vec2): void {
        const angle: number = radiansToDeg(Math.atan2(
            point[0],
            point[1]
        ));

        this.rotation = angle - this.parentRotation;
    }


    /**
     * Takes in a given world-space vector and returns the same point in this Entity's local-space.
     * @param point The world-space 2d vector point.
     * @returns The same point but in this Entity's local-space.
     */
    public toLocalPoint(point: vec2): vec2 {
        return vec2.transformMat3(
            vec2.create(),
            point,
            mat3.invert(mat3.create(), this.toWorldMat())
        );
    }

    /**
     * Takes in a given vector in this Entity's local-space and returns the same point in world-space.
     * @param point The local-space 2d vector point.
     * @returns The same point but in world-space.
     */
    public toWorldPoint(point: vec2): vec2 {
        return vec2.transformMat3(
            vec2.create(),
            point,
            this.toWorldMat()
        );
    }

    /**
     * Converts this Transform into a 3x3 Matrix.
     * @returns A mat3 3x3 Matrix.
     */
    public toLocalMat(): mat3 {
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

    /**
     * Converts this Transform into a 3x3 Matrix taking the Entity's parent in account.
     * Will only take the Entity's parent in account if it has "relativeChildren" property marked as true
     * and if this Entity has its "relativeChild" property marked as true.
     * @returns A mat3 3x3 Matrix.
     */
    public toWorldMat(): mat3 {
        if (this.owner.parent && this.owner.parent.relativeChildren && this.owner.relativeChild) {
            return mat3.mul(
                mat3.create(),
                this.owner.parent.transform.toWorldMat(),
                this.toLocalMat()
            );
        } else {
            return this.toLocalMat();
        }
    }
}
