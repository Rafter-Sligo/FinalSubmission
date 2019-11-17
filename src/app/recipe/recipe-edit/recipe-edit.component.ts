import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { DataStorageService } from 'src/app/shared/data-storage.service';


@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode = false;
  recipeForm: FormGroup;

  //makes this more secure
  get ingredientsControls(){
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }


  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private dataStorage: DataStorageService
              ) {
  }

  //when the page is loaded
  ngOnInit() {
    this.route.params
      .subscribe(
        (params: Params) => {
          this.id = +params['id'];  //retreiveing ID in parameter
          this.editMode = params['id'] != null; //when the parameters change.  Does it have an ID
          this.initForm(); //calling private method
        }
      );
  }

  onSubmit() {
    // const newRecipe = new Recipe(
    //   this.recipeForm.value['name'],
    //   this.recipeForm.value['description'],
    //   this.recipeForm.value['imagePath'],
    //   this.recipeForm.value['ingredients']);
    if (this.editMode) {
      this.recipeService.updateRecipe(this.id, this.recipeForm.value);
    } else {
      this.recipeService.addRecipe(this.recipeForm.value);
    }
    this.onCancel();

  }

  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(
      new FormGroup({
        'name': new FormControl(null, Validators.required),
        'amount': new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ])
      })
    );
  }

  onDeleteIngredient(index: number) {
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index);
  }

  onCancel() {  
    this.router.navigate(['../'], {relativeTo: this.route});
  }

  private initForm() { 
    let recipeName = '';  // setting it a empty string
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);  // cause there could be multiple

    //if we are in the edit mode
    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id); //gets the Id of the recipe that is beig edited
      recipeName = recipe.name; //value of the recipe from the service
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;

      // recipe has ingredients 
      if (recipe['ingredients']) {
        //have to loop incase there is multiple
        for (let ingredient of recipe.ingredients) {  
          //push them on the recipeIngredients Form Group to the Form Array
          recipeIngredients.push(
            new FormGroup({
              'name': new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [
                Validators.required,
                Validators.pattern(/^[1-9]+[0-9]*$/)
              ])
            })
          );
        }
      }
    }

    this.recipeForm = new FormGroup({
      //  'name'  = whats its named in the HTML Code
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
    });
  }

}