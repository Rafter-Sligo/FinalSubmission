import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RegisterComponent } from './register/register.component';
import { AuthGaurd } from './auth/auth-gaurd';

//The Routes
const appRoutes: Routes = [
  //pathMatch will display went the path is empty
  //{ path: 'register', component: RegisterComponent, canActivate: [AuthGaurd] },
  
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //Lazy Loading  =>  reduces the file size when running it
  { path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) }, 

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  //This will Bundle all the routing

}

