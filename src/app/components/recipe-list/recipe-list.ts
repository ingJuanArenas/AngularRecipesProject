
import { Component, effect, OnInit, signal } from '@angular/core';
import { Recipes } from '../models/recipe';
import {  RecipeCard } from "../recipe-card/recipe-card";
 import { FormsModule } from '@angular/forms';
import {  RecipesService } from '../features/recipe-service';
import {  Router } from '@angular/router';


@Component({
  selector: 'app-recipe-list',
  imports: [RecipeCard,FormsModule],
  templateUrl: './recipe-list.html',
})
export class RecipeList implements OnInit  {

    tRecipes = signal<Recipes[]> ([]);
    recipes= signal<Recipes[]>([]);
    userInput= signal<string>('');
    error = signal('')


  ngOnInit(): void {
      this.loading()
    }

    constructor(
      private service: RecipesService,
      private router: Router
    ){
      effect(()=>{
              this.recipes.set(this.tRecipes().filter(
            (r)=> r.name.toLowerCase().includes(this.userInput().toLowerCase())
          ))
      })
    }

    loading(){
        this.service.getAllRecipes().subscribe({
          next: (data)=>{
          this.tRecipes.set(data)
          this.recipes.set(this.tRecipes())
          },error: (err)=>{this.error.set(err)}
        })
    }

    showDetails(id: number){
      this.router.navigate(['recipes', id])
    }
    
}
