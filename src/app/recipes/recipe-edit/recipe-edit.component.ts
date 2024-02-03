import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router'
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;  
  editMode: boolean =  false;
  recipeForm: FormGroup;

  constructor(private route: ActivatedRoute, private recipeServie: RecipeService, private router: Router){

  }
  ngOnInit(): void {
    this.route.params.subscribe((params: Params) => {
      this. id = +params['id'];
      this.editMode = params['id'] != null;
      this.initForm()
    }
  )
}

  onSubmit(){
    const newRecipe = new Recipe(this.recipeForm.value['name'], 
      this.recipeForm.value['description'], 
      this.recipeForm.value['imagePath'],
      this.recipeForm.value['ingredients'])
    console.log(newRecipe)
    if (this.editMode){
      this.recipeServie.updateRecipe(this.id, newRecipe)
    }
    else{
      this.recipeServie.addRecipe(newRecipe);
    }

    this.onCancel()
  }

  onAddIngredient(){
      (<FormArray>this.recipeForm.get('ingredients')).push(
        new FormGroup({
          'name': new FormControl(null, Validators.required),
          'amount': new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
        })
      )
  }

  onCancel(){
    this.router.navigate(['../'], {relativeTo: this.route})
  }

  onDeleteIngredient(index: number){
    (<FormArray>this.recipeForm.get('ingredients')).removeAt(index)
  }

  private initForm(){
    
    let recipeName =  '';
    let recipeImagePath = '';
    let recipeDescription = '';
    let recipeIngredients = new FormArray([]);

    if ( this.editMode){
      const recipe = this.recipeServie.getRecipe(this.id);
      recipeName = recipe.name;
      recipeImagePath = recipe.imagePath;
      recipeDescription = recipe.description;
      if (recipe['ingredients']){
        for ( let ingredient of recipe.ingredients){
          recipeIngredients.push(
            new FormGroup({
              'name' : new FormControl(ingredient.name, Validators.required),
              'amount': new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
            })
          )
        }
      }
    }
    this.recipeForm = new FormGroup({
      'name': new FormControl(recipeName, Validators.required),
      'imagePath': new FormControl(recipeImagePath, Validators.required),
      'description': new FormControl(recipeDescription, Validators.required),
      'ingredients': recipeIngredients
      });
    }
    
    public get controls(){
      return (<FormArray>this.recipeForm.get('ingredients')).controls;
    }

    
}
