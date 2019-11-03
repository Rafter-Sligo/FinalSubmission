import { ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService{

    ingredientsChanged = new EventEmitter<ingredient[]>();

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
        this.ingredientsChanged.emit(this.ingredients.slice());
    }

    addIngredientsFromRecipe(ingredientsAdded: ingredient[]){
        // for(let ingredient of ingredientsAdded){
        //    this.addIngredients(ingredient);
        //}

        //Push cant handle an Array, It will make it a Single Object and push to a single array
        // ... == Spread Operator  makes it into a list of single Ingredients
        this.ingredients.push(...ingredientsAdded);
        this.ingredientsChanged.emit(this.ingredients.slice())
    }


}