import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { ShoppingListComponent } from './shopping-list.component';
import { ShoppingEditComponent } from './shopping-edit/shopping-edit.component';
import { SharedModule } from '../shared/shared.module';
import { AuthGaurd } from '../auth/auth-gaurd';

@NgModule({
  declarations: 
  [
    ShoppingListComponent, 
    ShoppingEditComponent
  ],
  imports: 
  [
    FormsModule,
    RouterModule.forChild([
      { path: '', component: ShoppingListComponent, canActivate: [AuthGaurd]  }
    ]),
    SharedModule
  ],
  // providers: [LoggingService]
})
export class ShoppingListModule {}
