namespace Engine{
    export class TEntity extends TGameObject{
        // entity properties
        children: TEntity[] = [];
        components: IComponent[] = [];
        
        transform: Transform = new Transform();

        constructor(){
            super();
        };

        update(dt:number): void {
            for(let c of this.components){
                c.update(dt);
            };
        };
    }; 
};