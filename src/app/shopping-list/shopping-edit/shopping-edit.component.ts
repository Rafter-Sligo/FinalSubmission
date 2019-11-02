import { Component, OnInit, ElementRef, ViewChild,EventEmitter, Output } from '@angular/core';
import { ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput', {static:false}) nameInputRef: ElementRef;
  @ViewChild('amountInput', {static:false}) amountInputRef: ElementRef;

  @Output() IngredientAdded = new EventEmitter<ingredient>();

  constructor() { }

  ngOnInit() {
  }

  onaddItem(){
    const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
    const newIngrendient = new ingredient(ingName,ingAmount);
    this.IngredientAdded.emit(newIngrendient);
  }


}