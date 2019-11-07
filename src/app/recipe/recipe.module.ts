import { NgModule } from '@angular/core';

import { RecipeComponent } from './recipe.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeListComponent } from './recipe-list/recipe-list.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipeItemComponent } from './recipe-list/recipe-item/recipe-item.component';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';

//Feature Modules
@NgModule({
    declarations: [
        RecipeComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent,
    ],
    imports: [CommonModule, RouterModule, ReactiveFormsModule],
    exports:[
        RecipeComponent,
        RecipeEditComponent,
        RecipeListComponent,
        RecipeItemComponent,
        RecipeDetailComponent,
        RecipeStartComponent
    ]
})
export class RecipeModule{

}