import { Component, OnInit, OnDestroy } from '@angular/core';
import { Recipe } from '../recipe.model'; //import the model class
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit,OnDestroy {

  //holding multiple Objects
  recipes: Recipe[];
  subscription: Subscription;

  
  //service has the list of recipes
  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.subscription = this.recipeService.recipesChanged
    .subscribe(
      (recipes: Recipe[]) => {
        this.recipes = recipes;
      }
    );
    
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe(){
    //to target the path I want to go to 
    this.router.navigate(['new'], {relativeTo: this.route});
  }


  ngOnDestroy() {
    this.subscription.unsubscribe();
  }


}
