import { mat3, vec2 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { SceneManager } from "../managers/SceneManager";
import { Scene } from "../ecs/Scene";
import { RendererManager } from "../managers/RendererManager";
import { degToRadians } from "../math/Utils";

export class Camera extends Entity {
    /** A size value that scales the camera view (DEFAULT VIEW IS RendererWidth, RendererHeight). */
    public size: number = 1;
    
    /** An offset to use when following an Entity. */
    public followOffset: vec2 = vec2.fromValues(0, 0);

    private _followEntity: Entity = null; // the entity that's being followed
    private _followRotMat: mat3 = mat3.create(); // a special rotation matrix to use when following

    private _transMat: mat3 = mat3.create();

    /** The Entity that this Camera is currently following. */
    public get followEntity(): Entity {
        return this._followEntity;
    }

    public get width(): number {
        return this.size * RendererManager.getInstance().currentRenderer.width;
    }

    public get height(): number {
        return this.size * RendererManager.getInstance().currentRenderer.height;
    }

    public get transMat(): mat3 {
        return this._transMat;
    }


    constructor(name: string) {
        super(name);
    }
    
    public override addParentScene(...scenes: Scene[]): void {
        super.addParentScene(...scenes);
        scenes.forEach((s) => s.addCamera(this));
    }

    public override removeParentScene(...scenes: string[]): void {
        scenes.forEach((s) => { if (this.hasParentScene(s)) { SceneManager.getInstance().getScene(s).removeCamera(this.name); } });
        super.removeParentScene(...scenes);
    }

    /**
     * Makes the Camera focus its center on an Entity causing it to follow the Entity.
     * @param entity The Entity for this Camera to follow.
     * @param offset An optional offset to use when following the Entity (can also be set through public "followOffset") property.
     */
    public startFollow(entity: Entity, offset?: vec2): void {
        this._followEntity = entity;

        if (offset !== undefined) this.followOffset = offset;
    }

    /**
     * Stops following an Entity if there is one being followed.
     */
    public stopFollow(): void {        
        this._followEntity = null;
    }


    /**
     * Returns the View Matrix (3x3) based on this Camera's Transform and width/height.
     */
    public view(): mat3 {
        if (this._followEntity && this.parent) {
            // set the position of this camera
            this.transform.position = this.parent.transform.toLocalPoint(
                vec2.add(
                    vec2.create(),
                    this._followEntity.transform.toWorldPoint(vec2.fromValues(0, 0)), // get world position of follow entity
                    this.followOffset
                )
            );

            this.transform.rotation = this._followEntity.transform.rotation;
        }

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
            if (this._followEntity) {
                // to cancel out rotation from parent entity when following
                mat3.fromRotation(this._followRotMat, degToRadians(this.parent.transform.rotation));
                mat3.invert(this._followRotMat, this._followRotMat);
            }

            mat3.mul(
                localMat,
                this._followRotMat,
                localMat
            );

            mat3.mul(
                worldViewMat,
                this.parent.transform.toWorldMat(),
                localMat
            );
        } else {
            worldViewMat = localMat;
        }

        mat3.copy(this._transMat, transMat);

        // inverse cam matrix
        mat3.invert(worldViewMat, worldViewMat);

        return worldViewMat;
    }
}
