import { Injectable, signal } from '@angular/core';
import { Recipes } from '../models/recipe';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

    @Injectable({
      providedIn: 'root'
    })
    export class RecipesService{

      private baseUrl = "http://localhost:8080/api/recipes";

      constructor(private http: HttpClient){}

      getAllRecipes(): Observable<Recipes[]>{
        return this.http.get<Recipes[]>(`${this.baseUrl}`);
      }

      getById(id:number): Observable<Recipes>{
        return this.http.get<Recipes>(`${this.baseUrl}/${id}`);
     }

    updateRecipe(id: number, recipe:Recipes){
     return this.http.put<Recipes>(`${this.baseUrl}/${id}`, recipe);
    }
    addNewRecipe(recipe:Recipes):Observable<Recipes>{
        return this.http.post<Recipes>(`${this.baseUrl}`, recipe);
    } 

    deleteRecipe(id: number){
      return this.http.delete<void>(`${this.baseUrl}/${id}`);
    }
    }


      
    
