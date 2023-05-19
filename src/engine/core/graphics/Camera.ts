import { mat3, vec2 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { SceneManager } from "../managers/SceneManager";
import { Scene } from "../ecs/Scene";
import { RendererManager } from "../managers/RendererManager";
import { degToRadians } from "../math/Utils";

export class Camera extends Entity {
    /** Represents the width in pixels of this Camera (DEFAULT = Current Renderer width). */
    public width: number = RendererManager.getInstance().currentRenderer.width;

    /** Represents the height in pixels of this Camera (DEFAULT = Current Renderer height). */
    public height: number = RendererManager.getInstance().currentRenderer.height;

    /**
     * Returns the ratio of cam dimensions to canvas dimension.
     * @returns Array -> [camWidth/canvasWidth, camHeight/canvasHeight] 
     */
    public get camToCanvasRatio(): number[] {
        return [
            this.width / RendererManager.getInstance().currentRenderer.width,
            this.height / RendererManager.getInstance().currentRenderer.height
        ];
    }

    constructor(name: string) {
        super(name);
    }
    
    public override addParentScene(...scenes: Scene[]): void {
        super.addParentScene(...scenes);
        scenes.forEach((s) => s.addCamera(this));
    }

    public override removeParentScene(...scenes: string[]): void {
        super.removeParentScene(...scenes);
        scenes.forEach((s) => { if (this.hasParentScene(s)) { SceneManager.getInstance().getScene(s).removeCamera(s); } });
    }

    /**
     * Returns the View Matrix (3x3) based on this Camera's Transform and width/height.
     */
    public view(): mat3 {
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
                this.camToCanvasRatio[0],
                this.camToCanvasRatio[1]
            )
        );

        // create local transformation matrix (similar to the one in Transform class)
        mat3.mul(localMat, transMat, fullRotMat);
        mat3.mul(localMat, localMat, scaleMat);

        // mult by parent matrix if needed
        if (this.parent && this.parent.relativeChildren) {
            mat3.mul(
                worldViewMat,
                this.parent.worldMatrix,
                localMat
            );
        } else {
            worldViewMat = localMat;
        }

        // inverse cam matrix
        mat3.invert(worldViewMat, worldViewMat);

        return worldViewMat;
    }
}
