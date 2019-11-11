import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RegisterRedoneComponent } from './register-redone.component';

describe('RegisterRedoneComponent', () => {
  let component: RegisterRedoneComponent;
  let fixture: ComponentFixture<RegisterRedoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RegisterRedoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterRedoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
