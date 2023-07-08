import { mat3, vec2 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { Scene } from "../ecs/Scene";
import { RendererManager } from "../managers/RendererManager";
import { degToRadians } from "../math/Utils";

import { Renderer } from "./Renderer";
import { Transform } from "../math/Transform";

/**
 * @classdesc
 * An Entity that acts as a camera which "views" the current {@link Scene} it is enabled in. This Camera acts as a 2D rectangle through
 * which other objects are viewed. This 2D rectangle is affected by this Camera's Transform (specifically position/rotation) and its size.
 * By default the size of this Camera fits perfectly to the current {@link Renderer}, but it's {@link size} property can scale this Camera
 * both in the X and Y direction. Since this Camera is a {@link Entity}, it can have children and be a child, which will affect its Transform,
 * and the way the Scene is viewed.
 * 
 * @class Entity
 * @extends Entity
 * 
 * @param {string} name - The name of this Camera.
 */
export class Camera extends Entity {
    /** A size value that scales this Camera's view. (DEFAULT VIEW IS RendererWidth, RendererHeight). */
    public size: number = 1;

    // This camera's world matrix (non-inverse).
    private _worldMat: mat3 = mat3.create();

    public get width(): number {
        return this.size * RendererManager.getInstance().currentRenderer.width;
    }

    public get height(): number {
        return this.size * RendererManager.getInstance().currentRenderer.height;
    }

    /** @returns {mat3} The world matrix of this Camera pre-inversion. */
    public get worldMat(): mat3 {
        return this._worldMat;
    }

    constructor(name: string) {
        super(name);
    }
    
    public override set parentScene(scene: Scene) {
        const oldParentScene: Scene = super.parentScene;
        super.parentScene = scene;

        if (scene !== null) {
            scene.addCamera(this);
        }

        if (oldParentScene !== null) {
            oldParentScene.removeCamera(this.name);
        }
    }

    /**
     * @returns {mat3} The view matrix based on this Camera's {@link Transform} and size.
     */
    public view(): mat3 {
        return this._calcViewMat();
    }

    // all the matrix math for the view matrix
    private _calcViewMat(): mat3 {
        var worldViewMat: mat3 = mat3.create();
        const localMat: mat3 = mat3.create();
    
        // main 3 transformations
        const transMat: mat3 = mat3.create();
        const fullRotMat: mat3 = mat3.create();
        const scaleMat: mat3 = mat3.create();

        // temp rot mat
        const rotMat: mat3 = mat3.create();

        // matricies needed for rot around a point (TODO: add to Transform class)
        const toOrigin: mat3 = mat3.create();
        const toOriginInv: mat3 = mat3.create();

        // create matricies for rotation
        mat3.fromTranslation(
            toOrigin,
            vec2.fromValues(-(this.width * 0.5), -(this.height * 0.5))
        );
        mat3.invert(toOriginInv, toOrigin);

        // create translation matrix
        mat3.fromTranslation(transMat, vec2.fromValues(
            this.transform.position[0] - (0.5 * this.width),
            this.transform.position[1] - (0.5 * this.height)
        ));

        // create FULL rotation matrix
        mat3.copy(fullRotMat, toOriginInv);
        mat3.mul(fullRotMat, fullRotMat, mat3.fromRotation(rotMat, degToRadians(this.transform.rotation)));
        mat3.mul(fullRotMat, fullRotMat, toOrigin);

        // create scale matrix
        mat3.fromScaling(
            scaleMat,
            vec2.fromValues(
                this.size,
                this.size
            )
        );

        // create local transformation matrix (similar to the one in Transform class)
        mat3.mul(localMat, transMat, fullRotMat);
        mat3.mul(localMat, localMat, scaleMat);

        // mult by parent matrix if needed
        if (this.parent && this.parent.relativeChildren && this.relativeChild) {
            mat3.mul(
                worldViewMat,
                this.parent.transform.toWorldMat(),
                localMat
            );
        } else {
            worldViewMat = localMat;
        }

        // reset the world matrix getter
        mat3.copy(this._worldMat, worldViewMat);

        // inverse cam matrix
        mat3.invert(worldViewMat, worldViewMat);

        return worldViewMat;
    }
}
