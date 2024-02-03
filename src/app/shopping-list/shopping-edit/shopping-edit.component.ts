import { Component, ViewChild, ElementRef, Output, EventEmitter, OnInit, OnDestroy, ViewRef } from '@angular/core';
import { Ingredient } from 'src/app/shared/ingredient.model';
import { ShoppingListServer } from '../shopping-list.server';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  // @ViewChild('nameInput') nameInput: ElementRef;
  // @ViewChild('amountInput') amountInput: ElementRef
  
  @ViewChild('f') slForm: NgForm
  editSubscribe: Subscription;
  editMode: boolean = false
  editItemIndex: number;
  editedItem: Ingredient;

  constructor(private shoppingListServer: ShoppingListServer){
  }
  ngOnInit(): void {
      this.editSubscribe = this.shoppingListServer.startedEditing.subscribe( (index: number) => {
        this.editMode = true;
        this.editItemIndex = index;
        this.editedItem = this.shoppingListServer.getIngredients()[this.editItemIndex];
        this.slForm.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        })
        console.log(this.editMode)
      })
  }


  onSubmit(form: NgForm) {
    const value = form.value
    const newIngredient = new Ingredient(value.name, value.amount)
    if(this.editMode){
      this.shoppingListServer.updateIngredient(this.editItemIndex, newIngredient)
      this.editMode = false;
    }
    else{
      this.shoppingListServer.addIngredient(newIngredient)
    }
    this.slForm.reset()

    
  }
  onClear(){
    this.slForm.reset();
    this.editMode=false;
  }
  
  onDelete(){
    this.shoppingListServer.deleteIngredient(this.editItemIndex)
    this.onClear()
  }

  ngOnDestroy(): void {
    this.editSubscribe.unsubscribe()
  }
}
