import TEntity from '@ecs/TEntity'; 

export default interface IComponent{
    update(): void;

    render(): void;

    owner: TEntity;
    setOwner(owner: TEntity): void;
};

// create an abstract class where setOwner sets the owner
// in the interface
export abstract class TComponent implements IComponent{
    owner: TEntity;

    setOwner(o: TEntity){
        this.owner = o;
    };

    update(){/* Is abstract, just a template */};

    render(){};
};
