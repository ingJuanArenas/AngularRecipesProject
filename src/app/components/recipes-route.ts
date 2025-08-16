import {  Routes } from "@angular/router";

export const recipes_routes:Routes = [
    {
        path: "",
        loadComponent: ()=> import('./recipe-list/recipe-list').then(c => c.RecipeList)
    },{
        path: "new",
        loadComponent: ()=> import('./recipe-form/recipes-form').then(c => c.RecipesForm)
    },{
        path: "edit/:recipeId",
        loadComponent: ()=> import('./recipe-form/recipes-form').then(c => c.RecipesForm)
    },{
        path: ":recipeId",
        loadComponent:()=> import('./recipes-details/recipes-details').then(c => c.RecipesDetails)
    }
]