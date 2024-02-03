
import { Ingredient } from "../shared/ingredient.model";
import { Subject } from 'rxjs'

export class ShoppingListServer{
   private ingredients: Ingredient[] = [ new Ingredient('apples', 5), new Ingredient('tomatoes', 10)];
   startedEditing =  new Subject<number>
   addIngredientsEvent = new Subject<Ingredient[]>

   getIngredients(){
    return this.ingredients.slice();
   }

   addIngredient(ingredient: Ingredient){
    this.ingredients.push(ingredient);
    this.addIngredientsEvent.next(this.ingredients.slice())
   
   }

   addIngredients(ingredients: Ingredient[]){
      this.ingredients.push(...ingredients)
      this.addIngredientsEvent.next(this.ingredients.slice())
      console.log(this.ingredients)
   }

   updateIngredient(index: number, newIngredient: Ingredient){
      this.ingredients[index] = newIngredient;
      this.addIngredientsEvent.next(this.ingredients.slice())
   }
   
   deleteIngredient(index: number){
      this.ingredients.splice(index, 1)
      this.addIngredientsEvent.next(this.ingredients.slice())
   }

   
    
}