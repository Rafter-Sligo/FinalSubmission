import { Component, OnInit } from '@angular/core';
import { trigger, style, transition, animate, keyframes, query, stagger } from '@angular/animations';

@Component({
  selector: 'app-contact-us',
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.css'],
  animations: [

    // having a delay between the input box's   ==  sexy 
    trigger('explainerAnim', [
      transition('* => *',[
        query('.form-control', style({ opacity: 0 , transform: 'translateX(-40px)' })),

        query('.form-control', stagger('500ms', [
          animate('800ms 1.2s ease-out', style( { opacity: 1 , transform: 'translateX(0)'} ))
        ])),
      ])

    ])

  ]
})
export class ContactUsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  onSubmit() {
    console.log('hello');
  }


}
