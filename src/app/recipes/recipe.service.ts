import { EventEmitter, Injectable } from "@angular/core";
import { Recipe } from "./recipe.model";
import { Ingredient } from "../shared/ingredient.model";
import { ShoppingListServer } from "../shopping-list/shopping-list.server";
import { Subject  } from "rxjs";

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>()
  //   private recipes: Recipe[] = [
  //   new Recipe(' A Test Recipe', 'Simple Test', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg', [new Ingredient('Meat', 1), new Ingredient('French Fires', 20)]), 
  //   new Recipe(' A Test Recipe2', 'Simple Test2', 'https://www.howtocook.recipes/wp-content/uploads/2021/05/Ratatouille-recipe.jpg', [new Ingredient('Buns', 1), new Ingredient('Buns', 20)])
  // ];

  private recipes: Recipe[] = [];

  constructor(private shoppingListServer: ShoppingListServer){

  }

  setRecipes(recipes: Recipe[]){
    this.recipes = recipes;
    this.recipesChanged.next(this.recipes.slice())
  }

  getRecipes(){
    return this.recipes.slice()
  }

  getRecipe(id: number){
    return this.recipes[id]
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListServer.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe){
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice())
  }

  updateRecipe(index: number, newRecipe: Recipe){
    this.recipes[index]= newRecipe;
    this.recipesChanged.next(this.recipes.slice())
  }

  deleteRecipe(index: number){
    this.recipes.splice(index,1);
    this.recipesChanged.next(this.recipes.slice())
  }
}