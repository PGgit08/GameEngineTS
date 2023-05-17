import { mat3 } from "gl-matrix";
import { Entity } from "../ecs/Entity";
import { SceneManager } from "../managers/SceneManager";
import { Scene } from "../ecs/Scene";

export class Camera extends Entity {
    constructor(name: string) {
        super(name);
    }
    
    public addParentScene(...scenes: Scene[]): void {
        super.addParentScene(...scenes);
        scenes.forEach((s) => s.addCamera(this));
    }

    public removeParentScene(...scenes: string[]): void {
        super.removeParentScene(...scenes);
        scenes.forEach((s) => { if (this.hasParentScene(s)) { SceneManager.getInstance().getScene(s).removeCamera(s); } });
    }

    public view(): mat3 {
        // identity for now
        return mat3.create();
    }
}
