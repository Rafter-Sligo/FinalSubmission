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

}