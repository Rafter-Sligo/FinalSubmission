import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  private recipes: Recipe[] = [
    new Recipe('Steak', 'less than half an hour of cook time and a prep time',
    'https://www.thespruceeats.com/thmb/hl4lkmdLO7tj1eDCsGbakfk97Co=/3088x2055/filters:fill(auto,1)/marinated-top-round-steak-3060302-hero-02-ed071d5d7e584bea82857112aa734a94.jpg', 
    [
        new Ingredient('Meat',2),
        new Ingredient('Chips',20)
    ]),

    new Recipe('Sandwich', 
    'A nice BLT',
    'https://upload.wikimedia.org/wikipedia/commons/e/e6/BLT_sandwich_on_toast.jpg', 
    [
        new Ingredient('Bacon',6),
        new Ingredient('letuce',3),
        new Ingredient('Tamato',1)
    ]   
) 
];

    constructor(private slService: ShoppingListService){

    }

    //getting the Recipes that are private
    getRecipes() {
        //Slice returns a new array is an exact copy
        return this.recipes.slice();
    }

    getRecipe(index: number) {
        return this.recipes[index];
      }
    
      addIngredientsToShoppingList(ingredients: Ingredient[]) {
        this.slService.addIngredients(ingredients);
      }
    
      addRecipe(recipe: Recipe) {
        this.recipes.push(recipe);
        this.recipesChanged.next(this.recipes.slice());
      }
    
      updateRecipe(index: number, newRecipe: Recipe) {
        this.recipes[index] = newRecipe;
        this.recipesChanged.next(this.recipes.slice());
      }
    
      deleteRecipe(index: number) {
        this.recipes.splice(index, 1);
        this.recipesChanged.next(this.recipes.slice());
      }
    
}