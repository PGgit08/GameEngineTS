import TEntity from "@ecs/TEntity";

/*
Basically the same thing as a Component,
however doesn't contain a render method,
and focuses more on pre-render update operations
like movement for example
*/
export default interface IBehavior{
    update(dt: number): void;

    owner: TEntity;
    setOwner(owner: TEntity): void;
};

export abstract class TBehavior implements IBehavior{
    private name: string

    owner: TEntity;

    constructor(name: string){
        this.name = name;
    };

    public get getName(): string{
        return this.name
    };

    setOwner(o: TEntity){
        this.owner = o;
    };

    update(dt: number){/* Is abstract, just a template */};
};