import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule} from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module'; 
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';

import { CoreModule } from './core.module';
import { SharedModule } from './shared/shared.module';
import { NewestRecipeComponent } from './newest-recipe/newest-recipe.component';



@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NewestRecipeComponent,
    //RegisterComponent, 
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    SharedModule,
    CoreModule
      
    // AngularFireModule.initializeApp(environment.firebase),
    // AngularFirestoreModule, // imports firebase/firestore, only needed for database features
    // AngularFireAuthModule, // imports firebase/auth, only needed for auth features
  ],
 // providers:[LoggingService],
  bootstrap: [AppComponent],

})
export class AppModule { }
