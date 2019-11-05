import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';

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

    constructor(private http: HttpClient){

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
        ).pipe(catchError(this.handleError));
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
        ).pipe(catchError(this.handleError));
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