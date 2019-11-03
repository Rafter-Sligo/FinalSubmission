import { ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs';

export class ShoppingListService{

    ingredientsChanged = new Subject<ingredient[]>();
    startedEditing = new Subject<number>();


    private ingredients : ingredient[] = [
        new ingredient('Cut Beef', 200),
        new ingredient('Onion', 10)
    
    ];

    getIngredients(){
        return this.ingredients.slice();
    }

    getIngredient(index: number) {
        return this.ingredients[index];
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

    updateIngredient(index: number, newIngredient: ingredient) {
        this.ingredients[index] = newIngredient;
        this.ingredientsChanged.next(this.ingredients.slice());
      }
    
    deleteIngredient(index: number) {
        this.ingredients.splice(index, 1);
        this.ingredientsChanged.next(this.ingredients.slice());
      }

}