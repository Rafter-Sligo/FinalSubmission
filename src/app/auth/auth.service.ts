import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';

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

    private handAuthentication(email: string, userId: string, token: string, expiresIn: number){
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000);  // returns a date object in milliseconds
        const user = new User(
            email,
            userId ,
            token,
            expirationDate
            );
        this.user.next(user);    

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