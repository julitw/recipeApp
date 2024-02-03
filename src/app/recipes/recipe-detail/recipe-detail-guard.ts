import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { RecipeService } from '../recipe.service';

@Injectable({providedIn: 'root'})
export class RecipeDetailGuard implements CanActivate {
  constructor(private recipeService: RecipeService, private router: Router) {}

  canActivate(route: ActivatedRouteSnapshot) {
    const id = +route.params['id'];
    if (isNaN(id) || !this.recipeService.getRecipe(id)) {
      this.router.navigate(['/recipes']);
      console.log('oki', id)
      console.log(this.recipeService.getRecipes())
      return false;
    }
    return true;
  }
}

