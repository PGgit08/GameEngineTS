namespace Engine{
    export interface IComponent{
        update(dt:number): void;

        render(): void;

        owner: TEntity;
        setOwner(owner: TEntity): void;
    };

    // create an abstract class where setOwner sets the owner
    // in the interface
    export abstract class TComponent implements IComponent{
        owner: TEntity;

        constructor(){
        };

        setOwner(o: TEntity){
            this.owner = o;
        };

        update(dt:number){/* Is abstract, just a template */};

        render(){};
    };
};