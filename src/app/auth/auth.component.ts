import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})
export class AuthComponent {
  isLoginMode = true;
  isLoading = false;
  error:string = null;  //error Messages

  constructor(private authService: AuthService, private router: Router){

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
       this.isLoading = false;

     });


    form.reset();
  }


}
