import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";
import { RecipeEditComponent } from "./recipe-edit/recipe-edit.component";
import { RecipeDetailComponent } from "./recipe-detail/recipe-detail.component";
import { RecipesResolverService } from "./recipes-resolver.servie";
import { RecipeDetailGuard } from "./recipe-detail/recipe-detail-guard";
import { RecipesComponent } from "./recipes.component";
import { AuthGard } from "../auth/auth.guard";
import { RecipeStartComponent } from "./recipe-start/recipe-start.component";

const routes: Routes = [
    { path: '', component: RecipesComponent, canActivate: [AuthGard], children: [
        { path: '', component: RecipeStartComponent},
        { path: 'new', component: RecipeEditComponent},
        {path: ':id', component: RecipeDetailComponent, resolve: [RecipesResolverService], canActivate: [RecipeDetailGuard], },
        { path: ':id/edit', component: RecipeEditComponent}
    ]},
]

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule]
})
export class RecipesRoutingModule{

}