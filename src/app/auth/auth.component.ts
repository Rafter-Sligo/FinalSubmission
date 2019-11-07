import { Component, ComponentFactoryResolver } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error:string = null;  //error Messages

  constructor(
    private authService: AuthService, 
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
    ){

  }

  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if(!form.valid){
      return;   //incase someone changes browser tools to mske button enabled
    }
    const email = form.value.email;
    const password = form.value.password;

    this.isLoading = true

    let authObs: Observable<AuthResponseData>;

    if(this.isLoginMode){
     authObs = this.authService.login(email,password)
    } 
    else
    {
     authObs = this.authService.signUp(email,password)
    }

    authObs.subscribe(
      resData => {
      console.log(resData);
      this.isLoading = false;
      this.router.navigate(['/recipes']);
   },
   errorMessage =>
     {
       console.log(errorMessage)      
       this.error = errorMessage;
       this.showErrorAlert(errorMessage);
       this.isLoading = false;

     });


    form.reset();
  }

  // onHandleError(){
  //   this.error = null;
  // }


  //Programmatic Component
  // Getting Angular to create the component for me
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    
  }

}
