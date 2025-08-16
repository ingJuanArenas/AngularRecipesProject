import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import {  RecipeList } from "./components/recipe-list/recipe-list";
import {   RecipesDetails } from "./components/recipes-details/recipes-details";
@Component({
  selector: 'app-root',
  imports: [RouterOutlet, RecipeList, RecipesDetails],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('recipes');
}
