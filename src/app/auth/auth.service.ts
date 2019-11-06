import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData{
    kind: string;
    idToken:string;
    email:string;
    refreshToken:string;
    expiresIn:string;
    localId:string;
    registered?: boolean;   // this is a optional variable, Cause only Login needs it 
}

@Injectable({providedIn:'root'})
export class AuthService{
    //this is like a subject the difference also gives subscribers imitate access to the pervious value
    user = new BehaviorSubject<User>(null);
    private tokenExpirationTimer: any;

    constructor(private http: HttpClient, private router: Router){

    }
    //Firebase Auth Rest Api
    // those are out keys
    signUp(email: string, password: string){
        return this.http
        .post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyBpmikPJo5GAAgveRNMXZwRFzz5qLtD3No',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), 
        tap(resData =>{
            this.handAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
                );
        })      
        );
    }


    login(email:string, password:string)
    {
        return this.http.post<AuthResponseData>(
            'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBpmikPJo5GAAgveRNMXZwRFzz5qLtD3No',
            {
                email: email,
                password: password,
                returnSecureToken: true            
            }
        ).pipe(catchError(this.handleError), 
        tap(resData =>{
            this.handAuthentication(
                resData.email,
                resData.localId,
                resData.idToken,
                +resData.expiresIn
                );
        })
        );
    }

    autoLogin(){                        //getItem Sysc method
        const userData: 
        {
            email: string;
            id: string;
            _token: string;
            _tokenExpirationDate: string;
        } = JSON.parse(localStorage.getItem('userData'));

        if(!userData){
            return;
        }
        
        const loadedUser = new User(
            userData.email, 
            userData.id,
            userData._token , 
            new Date(userData._tokenExpirationDate) 
        );
        
        if (loadedUser.token) {
            this.user.next(loadedUser);
            const expirationDuration =
              new Date(userData._tokenExpirationDate).getTime() -
              new Date().getTime();
            this.autoLogout(expirationDuration);
        }
      
    }

    logout(){
        this.user.next(null);   //sets the user to Null
        this.router.navigate(['/auth']);
        localStorage.removeItem('userData');

        if(this.tokenExpirationTimer){
            clearTimeout(this.tokenExpirationTimer);
        }
        this.tokenExpirationTimer = null;
    }

    autoLogout(expirationDuration: number){
        this.tokenExpirationTimer = setTimeout(() =>{
            this.logout();
        },expirationDuration)
    }

    private handAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);  // returns a date object in milliseconds
        const user = new User(
            email,
            userId ,
            token,
            expirationDate
            );
        this.user.next(user);    
        
        this.autoLogout(expiresIn * 1000);

        //Storing the User object in the local Storage
        //look at the Application in the browser    
        localStorage.setItem('userData', JSON.stringify(user));
    }



    private handleError(errorRes: HttpErrorResponse)
        {
         let errorMessage = 'An unknown error has occured!';
         if(!errorRes.error || !errorRes.error.error){
            return throwError(errorMessage);
                }

            switch(errorRes.error.error.message)  {
             case 'EMAIL_EXISTS':
                    errorMessage = 'This email exists already.';
                    break;
                case 'EMAIL_NOT_FOUND':
                    errorMessage = 'This email does not exist.';
                    break;             
                case 'INVALID_PASSWORD':
                    errorMessage = 'This password is not correct.';
                    break;
                case 'TOO_MANY_ATTEMPTS_TRY_LATER':
                    errorMessage = 'We have blocked all requests from this device due to unusual activity. Try again later.';     
                    break;     
            }
            return throwError(errorMessage);
    }


} 