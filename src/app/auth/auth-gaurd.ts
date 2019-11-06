import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router, UrlTree } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, tap, take } from 'rxjs/operators';


@Injectable({providedIn: 'root'})
export class AuthGaurd implements CanActivate{

    constructor(private authService: AuthService, private router: Router){
    }

    canActivate(
        route: ActivatedRouteSnapshot, 
        router: RouterStateSnapshot
        ): | boolean | UrlTree | Promise<boolean | UrlTree> | Observable<boolean | UrlTree> // returns one of these
    {
       return this.authService.user.pipe(
        take(1),
        map(user => {
           const isAuths = !!user;   //returns true or false
            if(isAuths){
                return true;
            }
            return this.router.createUrlTree(['auth']);
       }),

    //I got rid of this cause it can led to race conditions (when a device or system attempts to perform two or more operations at the same time)
    //    tap(isAuth =>{
    //        if(!isAuth){
    //            this.router.navigate(['auth'])
    //        }
    //    })
       );
    }
}