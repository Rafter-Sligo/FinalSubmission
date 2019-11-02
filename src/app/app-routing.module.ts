
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeComponent } from './recipe/recipe.component';

//This is my case 
const routes: Routes = [
    { path: 'recipe', component: RecipeComponent },
    { path: 'shoppinglist', component: ShoppingListComponent }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [ShoppingListComponent, RecipeComponent]
