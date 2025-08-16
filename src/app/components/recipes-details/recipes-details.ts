import { Component, effect, input, OnInit, signal } from '@angular/core';
import {  Recipes } from '../models/recipe';
import { RecipesService } from '../features/recipe-service';
import { ActivatedRoute, ParamMap, Router } from '@angular/router';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-recipes-details',
  imports: [RouterLink],
  templateUrl: './recipes-details.html',

})
export class RecipesDetails{

  recipeId = input<string |undefined>(undefined);
  loading =signal<boolean>(true);
  error = signal<string | undefined>(undefined);
  recipeDetail = signal<Recipes | undefined>(undefined);

  
    constructor(private service: RecipesService, private router: Router){ 
        effect(()=>{
            const id = this.recipeId()
          if(id){
            const idnum = parseInt(id);
            if (!isNaN(idnum)) {
              this.getRecipeDetail(idnum)
            }else{
              this.error.set("ID de la receta invalido")
              this.loading.set(false)
            }
          }else{
            this.error.set("ID vacio")
             this.loading.set(false)
          }
        });
   }



   getRecipeDetail(id:number){
     this.recipeDetail.set(undefined)
    this.error.set(undefined)
    this.loading.set(true)

      this.service.getById(id)
      .then(p=>{
          this.recipeDetail.set(p);
          this.loading.set(false);
      })
      .catch(error =>{
        this.error.set("Error al cargar los detalles");
        this.loading.set(false);
      })
   }
    goBack(){
      this.router.navigateByUrl("/recipes")
    }

    delete(){
      this.service.deleteRecipe(parseInt(this.recipeId()!));
      alert("ELIMINADA EXITOSAMENTE!")
      this.goBack()
    }
}
