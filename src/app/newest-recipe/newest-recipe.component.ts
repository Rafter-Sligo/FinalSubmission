import { Component, OnInit } from '@angular/core';
import { NewRecipe } from './newest-recipe.model';
import { NewRecipeService } from './newest-recipe.service';

@Component({
  selector: 'app-newest-recipe',
  templateUrl: './newest-recipe.component.html',
  styleUrls: ['./newest-recipe.component.css']
})
export class NewestRecipeComponent implements OnInit {

  constructor(private newRecipeService : NewRecipeService){

  }
  
  ngOnInit() {
  }

  recipeData: NewRecipe;
  errorMessage:any;
  imageHeight=300;


  getRecipeDetails(recipeName: string):boolean{
    this.newRecipeService.getRecipeData(recipeName).subscribe(Data =>{
      this.recipeData = Data;
    },

    error => this.errorMessage = <any>error);
    return false;
  }

}
