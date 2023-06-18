import { mat3, vec2 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { Scene } from "../ecs/Scene";
import { RendererManager } from "../managers/RendererManager";
import { degToRadians } from "../math/Utils";

export class Camera extends Entity {
    /** A size value that scales the camera view (DEFAULT VIEW IS RendererWidth, RendererHeight). */
    public size: number = 1;

    // This camera's world matrix (non-inverse).
    private _worldMat: mat3 = mat3.create();

    public get width(): number {
        return this.size * RendererManager.getInstance().currentRenderer.width;
    }

    public get height(): number {
        return this.size * RendererManager.getInstance().currentRenderer.height;
    }

    /** The world matrix of this Camera pre-inversion. */
    public get worldMat(): mat3 {
        return this._worldMat;
    }

    constructor(name: string) {
        super(name);
    }
    
    public override setParentScene(scene: Scene): void {
        if (scene === null) {
            this.parentScene.removeCamera(this.name);
            super.setParentScene(scene);
            return;
        }

        scene.addCamera(this);
        super.setParentScene(scene);
    }

    /**
     * Returns the View Matrix (3x3) based on this Camera's Transform and size.
     * Use this instead of Transform.toWorldMat();
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
