import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ShoppingListComponent } from './shopping-list/shopping-list.component';
import { RegisterComponent } from './register/register.component';
import { AuthComponent } from './auth/auth.component';
import { AuthGaurd } from './auth/auth-gaurd';

//The Routes
const appRoutes: Routes = [
  //pathMatch will display went the path is empty
  { path: 'register', component: RegisterComponent, canActivate: [AuthGaurd] },
  { path: '', redirectTo: '/recipes', pathMatch: 'full' },

  { path: 'shopping-list', component: ShoppingListComponent },
  { path: 'auth', component: AuthComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  //This will Bundle all the routing

}

