import { mat3, vec2 } from "gl-matrix";
import { degToRadians, radiansToDeg } from "./Utils";
import { Entity } from "../ecs/Entity";
import { SceneManager } from "../managers/SceneManager";
import { GameObject } from "../ecs/GameObject";

/**
 * @classdesc
 * A GameObject part of all {@link Entity} objects. It defines the Entity's transform in space through position, rotation, and scale.
 * 
 * @class Transform
 * @extends GameObject
 * 
 * @param {Entity} owner - The owner Entity of this Transform.
 */
export class Transform extends GameObject {
    /** The position vector of this Transform (DEFAULT IS (0, 0)). @type {vec2} */
    public position: vec2 = vec2.create();

    /** The rotation in degrees of this Transform (DEFAULT IS 0). @type {number} */
    public rotation: number = 0;

    /** The scale of this Transforms (DEFAULT IS (1, 1)). @type {vec2} */
    public scale: vec2 = vec2.fromValues(1, 1);

    /** The owner of this Transform. @type {Entity} @readonly */
    public readonly owner: Entity;

    /** Prevents this Entity from changing in size when camera size changes. */
    public ignoreCamSize: boolean = false;

    constructor(owner: Entity) {
        super("Transform");
        
        this.owner = owner;
    }

    /**
     * Translate this Transform.
     * 
     * @param {vec2} v - The vector to translate this Transform by.
     */
    public translate(v: vec2): void {
        this.position = vec2.fromValues(this.position[0] + v[0], this.position[1] + v[1]);
    }

    /**
     * Translate this Transform along its local X/Y axis.
     * 
     * @param {vec2} v - The vector to translate this Transform by.
     */
    public localTranslate(v: vec2): void {
        this.translate(this.localDirection(v));
    }

    /**
     * Rotate this Transform.
     * 
     * @param {number} d - The degrees to rotate this Transform by.
     */
    public rotate(d: number): void {
        this.rotation += d;
    }

    /**
     * Changes the direction of a vector based on this Transform's rotation.
     * 
     * @param {vec2} directionVector - The vector.
     * 
     * @returns {vec2} The vector with a new direction.
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
     * 
     * @param {vec2} point - The point to rotate around.
     */
    public rotateAround(point: vec2): void {}

    /**
     * Sets the rotation of this Transform so it looks at a point.
     * 
     * @param {vec2} point - The point to look at (VECTOR).
     */
    public lookAt(point: vec2): void {
        const transPoint: vec2 = vec2.create();

        vec2.transformMat3(
            transPoint,
            point,
            mat3.invert(mat3.create(), this.toWorldMat())
        );

        const angle: number = radiansToDeg(Math.atan2(
            transPoint[0],
            -transPoint[1]
        ));

        this.rotate(angle);
    }

    /**
     * Takes in a given world-space vector and returns the same vector but in this Transforms's local-space.
     * 
     * @param {vec2} point - The world-space 2D vector point.
     * 
     * @returns {vec2} The same vector but in this Transforms's local-space.
     */
    public toLocalPoint(point: vec2): vec2 {
        return vec2.transformMat3(
            vec2.create(),
            point,
            mat3.invert(mat3.create(), this.toWorldMat())
        );
    }

    /**
     * Takes in a given vector in this Transforms's local-space and returns the same point in world-space.
     * 
     * @param {vec2} point - The local-space 2D vector point.
     * 
     * @returns {vec2} The same vector but in world-space.
     */
    public toWorldPoint(point: vec2): vec2 {
        return vec2.transformMat3(
            vec2.create(),
            point,
            this.toWorldMat()
        );
    }


    /**
     * Converts this Transform into a 3x3 matrix.
     * 
     * @returns {mat3} A 3x3 matrix.
     */
    public toLocalMat(): mat3 {
        const transMat: mat3 = mat3.create();
        const rotMat: mat3 = mat3.create();
        const scaleMat: mat3 = mat3.create();
        const outMat: mat3 = mat3.create();

        const scale: vec2 = vec2.create();
        vec2.copy(scale, this.scale)

        if (this.ignoreCamSize) {
            vec2.mul(
                scale,
                this.scale,
                vec2.fromValues(
                    SceneManager.getInstance().currentScene.currentCamera.size,
                    SceneManager.getInstance().currentScene.currentCamera.size
                )
            )
        }

        mat3.fromTranslation(transMat, this.position);
        mat3.fromRotation(rotMat, degToRadians(this.rotation));
        mat3.fromScaling(scaleMat, scale);

        // ORDER OF TRANSFORMATION -> scale point, rotate scaled, translate rotated scaled
        // MATRIX MULTIPLICATION -> do it in reverse because the matrix closest to point is the "function" that's first applied

        mat3.mul(outMat, transMat, rotMat);
        mat3.mul(outMat, outMat, scaleMat);

        return outMat;
    }

    /**
     * Converts this Transform into a 3x3 matrix taking this Transform's owner's parent in account.
     * Will only take the owner's parent in account if it has "relativeChildren" property marked as true
     * and if the owner has its "relativeChild" property marked as true.
     * 
     * @returns {mat3} A 3x3 matrix.
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
