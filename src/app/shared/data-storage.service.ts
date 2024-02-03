import { Injectable } from "@angular/core";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Recipe } from "../recipes/recipe.model";
import { RecipeService } from "../recipes/recipe.service";
import { filter, map, tap, take, exhaustMap } from 'rxjs'
import { AuthService } from "../auth/auth.service";

@Injectable({providedIn: 'root'})
export class DataStorageService {
    constructor(private http: HttpClient, private recipeService: RecipeService, private authServie: AuthService ){

    }

    storeRecipes(){
        const recipes  = this.recipeService.getRecipes()
        this.http.put('https://recipeapp-419a2-default-rtdb.firebaseio.com/recipes.json', recipes).subscribe(response => {
            console.log(response)
        })
    }




    fetchRecipes(){
        console.log(this.authServie.user)
         return this.authServie.user.pipe(
            take(1), 
            exhaustMap(user => {
                console.log(user.token)
                return this.http.get<Recipe[]>('https://recipeapp-419a2-default-rtdb.firebaseio.com/recipes.json',
             ).pipe(
                filter(recipes => recipes !== null && recipes !== undefined),
                map(recipes => {
                            return recipes.map(recipe => {
                                 return {...recipe, ingredients: recipe.ingredients ?  recipe.ingredients :  []}
                             })
                }),
                tap(recipes => {
                    this.recipeService.setRecipes(recipes)
                })
                
             )
    }))}

}
            

    // fetchRecipes(){
    //     console.log(this.authServie.user)
    //      return this.authServie.user.pipe(
    //         take(1), 
    //         exhaustMap(user => {
    //             console.log(user.token)
    //             return this.http.get<Recipe[]>('https://recipeapp-419a2-default-rtdb.firebaseio.com/recipes.json?auth=' + user.token,
    //          )
    //         }), 
    //         filter(recipes => recipes !== null && recipes !== undefined),
    //         map(recipes => {
    //         return recipes.map(recipe => {
    //             return {...recipe, ingredients: recipe.ingredients ?  recipe.ingredients :  []}
    //         })
    //     }), 
    //     tap(recipes => {
    //         this.recipeService.setRecipes(recipes)
    //     }))

        //  .subscribe(recipes => {
        //      this.recipeService.setRecipes(recipes)
        //  } 
        // )
