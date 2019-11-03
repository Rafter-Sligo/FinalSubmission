import { ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService{

    ingredientsChanged = new Subject<ingredient[]>();

    private ingredients : ingredient[] = [
        new ingredient('Cut Beef', 200),
        new ingredient('Onion', 10)
    
    ];

    getIngredients(){
        return this.ingredients.slice();
    }
    //adding items
    addIngredients(ingredientAdd: ingredient){
        this.ingredients.push(ingredientAdd);
        this.ingredientsChanged.next(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredientsAdded: ingredient[]){
        // for(let ingredient of ingredientsAdded){
        //    this.addIngredients(ingredient);
        //}

        //Push cant handle an Array, It will make it a Single Object and push to a single array
        // ... == Spread Operator  makes it into a list of single Ingredients
        this.ingredients.push(...ingredientsAdded);
        this.ingredientsChanged.next(this.ingredients.slice())
    }


}