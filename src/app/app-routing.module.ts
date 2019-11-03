import { NgModule } from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';

//The Routes
const appRoute: Routes = [
    //pathMatch will display went the path is empty
    {path: '',redirectTo: '/recipes', pathMatch: 'full'},
    {path: 'recipes', component: RecipeComponent, children: [
        { path: '',component: RecipeStartComponent} //making it display inside the recipe component
    ]},
    {path: 'shopping-list', component: ShoppingListComponent}

];

@NgModule({
    imports:[RouterModule.forRoot(appRoute)],
    exports: [RouterModule]
})
export class AppRoutingModule{
    //This will Bundle all the routing

}