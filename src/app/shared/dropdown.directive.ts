import {Directive, ElementRef, HostBinding, HostListener} from '@angular/core';
 
@Directive({
  selector: '[appDropdown]'
})
  //@HostBinding() its getting the class and opening it (automatically set to be closed)
  //@HostListener() is checking to see it has been clicked
  
  //toggle Open method then passes the event to check the native element has been pressed while it has been already opened
  //  its been opened before it will close it

export class DropdownDirective {   
  //@HostBinding() function decorator allows you to set the properties of the host element from the directive class.
  @HostBinding('class.open') isOpen = false;

  //@HostListener() function decorator allows you to handle events of the host element in the directive class.
  @HostListener('document:click', ['$event']) toggleOpen(event: Event) 
  {
    this.isOpen = this.elRef.nativeElement.contains(event.target) ? !this.isOpen : false;
  }
  //a class that wraps native DOM elements in the browser
  constructor(private elRef: ElementRef) {}
}