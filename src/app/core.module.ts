import { NgModule } from "@angular/core";
import { ShoppingListServer } from "./shopping-list/shopping-list.server";
import { RecipeService } from "./recipes/recipe.service";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { AuthInterceptorService } from "./auth/auth-interceptor.service";

@NgModule({
    providers: [
        [ShoppingListServer,
        RecipeService, 
        {provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true}]
    ]
})
export class CoreModule {

}