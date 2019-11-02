import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'; //import the model class
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  //holding multiple Objects
  recipes: Recipe[];
  
  //service has the list of recipes
  constructor(private recipeService: RecipeService) { }


  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
  }



}
