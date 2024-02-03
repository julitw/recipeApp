import { Component, OnDestroy, OnInit } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';

import { ShoppingListServer } from './shopping-list.server';
import { Subscription } from 'rxjs';
import { LoggingService } from '../logging.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css'],
  // providers: [ShoppingListServer]
})
export class ShoppingListComponent implements OnInit, OnDestroy {
    ingredients: Ingredient[];
    private igChangedSub: Subscription;

    constructor(private shoppingListServer: ShoppingListServer, private loggingService: LoggingService){}

    ngOnInit(): void {
      this.ingredients = this.shoppingListServer.getIngredients();
      this.igChangedSub = this.shoppingListServer.addIngredientsEvent.subscribe((ingredients: Ingredient[]) => this.ingredients = ingredients);
      this.loggingService.printingLog('Hello from ShoppingListComponent ingOnInit')
    }
    
    onAddToShoppingList(){
      
    }
    ngOnDestroy(): void {
      this.igChangedSub.unsubscribe()
    }
    onEditItem(index: number){
      this.shoppingListServer.startedEditing.next(index)
    }
  
}
