import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeComponent } from './recipe.component';
import { AuthGaurd } from '../auth/auth-gaurd';
import { RecipeStartComponent } from './recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe-edit/recipe-edit.component';
import { RecipeDetailComponent } from './recipe-detail/recipe-detail.component';
import { RecipesResolverService } from './recipes-resolver.service';


const routes: Routes = [
        { path: 'recipes', 
        component: RecipeComponent,
        canActivate: [AuthGaurd],
        children:
        [
          { path: '', component: RecipeStartComponent },
          { path: 'new', component: RecipeEditComponent },
          { path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService] },
          { path: ':id/edit', component: RecipeEditComponent, resolve: [RecipesResolverService] },
        ]
      },
];
  
NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
  
})
export class RecipesRoutingModule{

}