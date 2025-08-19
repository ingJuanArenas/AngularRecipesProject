import { Component, effect, input, signal } from '@angular/core';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { Router, RouterLink } from '@angular/router';
import { Recipes } from '../models/recipe';
import { RecipesService } from '../features/recipe-service';




@Component({
  selector: 'app-recipes-form',
  imports: [ReactiveFormsModule],
  templateUrl: './recipes-form.html',
})
export class RecipesForm {

    recipeId = input<string | undefined >();
    loading = signal<boolean>(true);
    error = signal<string |undefined>(undefined);
    isEditMode = signal<boolean>(false);

    recipeForm = new FormGroup({
         id: new FormControl<number|null>(0, Validators.min(0)),
        name: new FormControl<string | null>('', Validators.required),
        src: new FormControl<string | null>('', [Validators.required,Validators.pattern(/^(http|https):\/\/[^ "]+$/)]),
        description: new FormControl<string | null> ('', [Validators.required,Validators.minLength(20)]),
        instructions: new FormControl<string | null>('', [Validators.required,Validators.minLength(100)]),
        time: new FormControl<number | null>(0, [Validators.required,Validators.min(5)]),
    })

  constructor(private router: Router, private service: RecipesService){
    effect(()=>{
        if(this.recipeId()){
          this.isEditMode.set(true)
          this.loading.set(true);
          this.error.set(undefined);
                  const id = parseInt(this.recipeId() ?? "0");
                  this.service.getById(id).subscribe({
                    next: (data)=>{
                      this.recipeForm.patchValue(data);
                      this.loading.set(false)
                    },error: (err) => { this.error.set(err); this.loading.set(false)}
                  })

        }else{
          this.isEditMode.set(false);
          this.loading.set(false)
        }
    });
  }

  goBack(){
    if(this.isEditMode()){
        this.router.navigate(['recipes', this.recipeId()]);
    }else{
          this.router.navigateByUrl('/recipes');
    }
  }

  saveData(){
     const newRecipe = this.recipeForm.value as Recipes;

    this.service.addNewRecipe(newRecipe).subscribe({
      next: (data)=>{
        alert("Guardado exitosamente!");
        this.goBack()
      }, error: (err) => { this.error.set(err); this.loading.set(false)}
    })    

  }

  update(){
     const recipe = this.recipeForm.value as Recipes;
     const id= parseInt(this.recipeId()!);
     this.service.updateRecipe(id,recipe).subscribe({
      next: (data)=>{
          alert("Actualizado exitosamente!");
          this.goBack()
      },error:(err)=> { this.error.set(err); this.loading.set(false)}
     });
  }
}


