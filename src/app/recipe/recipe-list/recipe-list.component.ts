import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model'; //import the model class
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {

  //holding multiple Objects
  recipes: Recipe[];
  
  //service has the list of recipes
  constructor(private recipeService: RecipeService, 
              private router: Router,
              private route: ActivatedRoute) { }


  ngOnInit() {
    this.recipes = this.recipeService.getRecipe();
  }

  onNewRecipe(){
    //to target the path I want to go to 
    this.router.navigate(['new'], {relativeTo: this.route});
  }



}
