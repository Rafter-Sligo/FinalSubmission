import { HostListener,Directive, HostBinding,  } from '@angular/core';

@Directive({
    selector: '[appDropdown]'
})
export class DropdownDirective {
    //class is an array of all the classes
    //open is a css Class to open the dropdown menu
    @HostBinding('class.open') isOpen=false;

    //when its true it will open when its false it will remain closed
    @HostListener('click') toggleOpen(){
        this.isOpen = !this.isOpen;
    }
}