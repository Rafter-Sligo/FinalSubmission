import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import {Observable} from 'rxjs';
import { catchError, tap} from 'rxjs/operators';
import { NewRecipe } from './newest-recipe.model';


@Injectable({
  providedIn: 'root'
})


export class NewRecipeService {

     _siteURL = 'https://www.themealdb.com/api/json/v1/1/search.php?s=';

   constructor(private _http: HttpClient) { }

   getRecipeData(recipeName): Observable<NewRecipe>{
    console.log("URL: " + this._siteURL+recipeName);

    return this._http.get<NewRecipe>(this._siteURL+recipeName).pipe(
    tap(data => console.log('All :' + JSON.stringify(data))),
    catchError(this.handleError));
  }


  private handleError(err: HttpErrorResponse){
    console.log('OmdbApiService: '+ err.message);
    return Observable.throw(err.message);
  }

}