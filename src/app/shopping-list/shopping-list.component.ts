import { Component, OnInit } from '@angular/core';
import { ingredient} from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {

  ingredients : ingredient[] = [
    new ingredient('Cut Beef', 200),
    new ingredient('Onion', 10)

  ];

  constructor() { }

  ngOnInit() {
  }

  onIngredientAdded(ingredientAdd: ingredient){
    this.ingredients.push(ingredientAdd);
  }

}
