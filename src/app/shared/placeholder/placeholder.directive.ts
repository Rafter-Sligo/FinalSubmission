import { Directive, ViewContainerRef } from '@angular/core';

@Directive({
  selector: '[appPlaceholder]'
})

//this gives me access by reference at the place this direcive is used
export class PlaceholderDirective {
  constructor(public viewContainerRef: ViewContainerRef) {}
}