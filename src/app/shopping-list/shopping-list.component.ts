import { Component, OnInit, OnDestroy } from '@angular/core';
import { ingredient} from '../shared/ingredient.model'
import { ShoppingListService } from './shopping-list.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
//OnDestory (interface)= Clear when we leave the component
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients : ingredient[];
  private subscription: Subscription;

  constructor(private slService: ShoppingListService) { }

  ngOnInit() {
    this.ingredients = this.slService.getIngredients();

    this.subscription = this.slService.ingredientsChanged.subscribe(
      (ingredientSub: ingredient[]) => {
        this.ingredients = ingredientSub;
      });
  }

  ngOnDestroy(): void{
    this.subscription.unsubscribe();
  }
}
