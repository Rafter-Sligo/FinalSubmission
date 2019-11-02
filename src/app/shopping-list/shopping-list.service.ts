import { ingredient } from '../shared/ingredient.model';

export class ShoppingListService{

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
    }

}