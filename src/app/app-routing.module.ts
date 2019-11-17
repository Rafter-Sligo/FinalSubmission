import { NgModule } from '@angular/core';
import { Routes, RouterModule, PreloadAllModules } from '@angular/router';
import { AuthGaurd } from './auth/auth-gaurd';
import { NewestRecipeComponent } from './newest-recipe/newest-recipe.component';
import { ContactUsComponent } from './contact-us/contact-us.component';


//The Routes
const appRoutes: Routes = [
  //pathMatch will display went the path is empty
  //{ path: 'register', component: RegisterComponent, canActivate: [AuthGaurd] },
  
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },
  //Lazy Loading  =>  reduces the file size when running it
  { path: 'recipes', loadChildren: () => import('./recipe/recipe.module').then(m => m.RecipeModule) }, 
  { path: 'shopping-list', loadChildren: () => import('./shopping-list/shopping-list.module').then(m => m.ShoppingListModule) }, 
  { path: 'auth', loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule) }, 
  { path: 'newest-recipe', component: NewestRecipeComponent, canActivate: [AuthGaurd] },
  { path: 'contact-us', component: ContactUsComponent, canActivate: [AuthGaurd] },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {
  //This will Bundle all the routing
}

