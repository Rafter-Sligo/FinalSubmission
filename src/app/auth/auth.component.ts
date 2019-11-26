import { Component, ComponentFactoryResolver, ViewChild, OnDestroy } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component';
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html'

})
export class AuthComponent implements OnDestroy {
  isLoginMode = true;
  isLoading = false;
  error: string = null;  //error Messages
  @ViewChild(PlaceholderDirective, { static: false }) alertHost: PlaceholderDirective;

  private closeSub: Subscription;

  constructor(
    private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver
  ) {

  }

  //Switching between Login and Signup
  onSwitchMode() {
    this.isLoginMode = !this.isLoginMode;
  }

  onSubmit(form: NgForm) {
    if (!form.valid) {
      return;   //incase someone changes browser tools to make button enabled
    }

    //Pulling Values from the Form
    const email = form.value.email;
    const password = form.value.password;
    const passwords = form.value.passwords;

    //Checking if the passwords are not the same
    //need to have page loaded to false or no one can login
    if(this.isLoginMode == false && password != passwords){
      alert('passwords dont mathc');
      return;
    }

    this.isLoading = true

    let authObs: Observable<AuthResponseData>;

    if (this.isLoginMode) {
      authObs = this.authService.login(email, password)
    }
    else {
      authObs = this.authService.signUp(email, password)
    }

    authObs.subscribe(
      resData => {
        console.log(resData);
        this.isLoading = false;
        this.router.navigate(['/recipes']); // if sucessfull go to recipes
      },
      errorMessage => {
        this.error = errorMessage;
        this.showErrorAlert(errorMessage);  // if failure send an error message
        this.isLoading = false;
      });


    form.reset(); // resets the form
  }

  onHandleError() {
    this.error = null;
  }

  ngOnDestroy() {
    if (this.closeSub) {
      this.closeSub.unsubscribe();
    }
  }

  //Programmatic Component
  // Getting Angular to create the component for me
  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);

    // it is an object that allows u to interact with the DOM
    const hostViewContainerRef = this.alertHost.viewContainerRef;
    hostViewContainerRef.clear(); // things that might have been rendered there before

    //creating a new component
    const componentRef = hostViewContainerRef.createComponent(alertCmpFactory);

    // instance gives access to the existing instance of this component that
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewContainerRef.clear();
    });
  }
}
