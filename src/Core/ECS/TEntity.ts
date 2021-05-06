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

        /* NOTE: For now rendering just passes the context as a param,
            which isn't great preformance wise, but that can be fixed in 
            later development.
        */
        render(): void {
            for(let c of this.components){
                c.render();
            };
        };
    }; 
};