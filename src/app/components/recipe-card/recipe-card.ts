import { Component, input, output} from '@angular/core';
import { Recipes } from '../models/recipe';


@Component({
  selector: 'app-recipe-card',
  imports: [],
  templateUrl: './recipe-card.html',
})
export class RecipeCard {
    recipe = input<Recipes>();

    showDetails= output<number>();

    details(){
      this.showDetails.emit(this.recipe()!.id)
    }
}
