import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { trigger, style, transition, animate, keyframes, query, stagger, state } from '@angular/animations';


import swal from 'sweetalert'; // npm install sweetalert --save
import { DataStorageService } from 'src/app/shared/data-storage.service';
//export as namespace swal;  <-- comment out cause it conflicts with Bootstrap

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css'],
  animations: [ 

    //fade in for the drop down
    trigger('fadeIn', [
      // when it goes from void to default
      transition('void => *' , [
        style( { opacity: 0 } ),
        animate(2000, style( { opacity: 1 } ))  // applies over a period of time
      ])
    ])

  ]
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router,
    private dataStorage: DataStorageService) {
  }

  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];
          this.recipe = this.recipeService.getRecipe(this.id);
        }
      );
  }

  onAddToShoppingList() {
    swal("Recipe added", "Recipe added to shopping list sucessfully!", "success");
    this.recipeService.addIngredientsToShoppingList(this.recipe.ingredients);
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
    // this.router.navigate(['../', this.id, 'edit'], {relativeTo: this.route});
  }

  onDeleteRecipe() {
    swal("Recipe deleted!", "Recipe deleted sucessfully!", "success");
  
  // swal({
  //   title: "Are you sure?",
  //   text: "Once deleted, you will not be able to recover this imaginary file!",
  //   icon: "warning",
  //   buttons: true,
  //   dangerMode: true,
  // })
  // .then((willDelete) => {
  //   if (willDelete) {
  //     swal("Poof! Your imaginary file has been deleted!", {
  //       icon: "success",
  //     });
  //   } else {
  //     swal("Your imaginary file is safe!");
  //   }
  // });

    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
    this.dataStorage.storeRecipes();

  }
}