import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';

import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { swal } from 'bootstrap-sweetalert'

//import swal from 'sweetalert'; // npm install sweetalert --save
//export as namespace swal;  <-- comment out cause it conflicts with Bootstrap

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: number;

  constructor(private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router) {
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
  //  swal("Recipe deleted!", "Recipe deleted sucessfully!", "success");
  swal({
    title: "Are you sure?",
    text: "Once deleted, you will not be able to recover this imaginary file!",
    icon: "warning",
    buttons: true,
    dangerMode: true,
  })
  .then((willDelete) => {
    if (willDelete) {
      swal("Poof! Your imaginary file has been deleted!", {
        icon: "success",
      });
    } else {
      swal("Your imaginary file is safe!");
    }
  });
    // swal({
    //   title: "Are you sure?",
    //   text: "You will Delete this Recipe",
    //   type: "warning",
    //   showCancelButton: true,
    //   confirmButtonClass: "btn-danger",
    //   confirmButtonText: "Delete it!",
    //   cancelButtonText: "Cancel",
    //   closeOnConfirm: false,
    //   closeOnCancel: false
    // },
    // function(isConfirm) {
    //   if (isConfirm) {
    //     swal("Deleted!", "Your Recipe has been deleted.", "success");
    //   } else {
    //     swal("Cancelled", "Your Recipe is safe :)", "error");
    //   }
    // });

    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this imaginary file!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
    .then((willDelete) => {
      if (willDelete) {
        swal("Poof! Your imaginary file has been deleted!", {
          icon: "success",
        });
      } else {
        swal("Your imaginary file is safe!");
      }
    });


    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['/recipes']);
  }
}