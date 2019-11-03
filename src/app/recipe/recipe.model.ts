import { ingredient } from '../shared/ingredient.model';

export class Recipe{
    //A Blueprint
    public name: string;
    public description: string;
    public imgPath: string;
    public ingredient: ingredient[];
    
    constructor(name: string, desc: string, imagePath:string,ingredientCon: ingredient[]){
        this.name = name;
        this.description = desc;
        this.imgPath = imagePath;
        this.ingredient = ingredientCon;
    }
}