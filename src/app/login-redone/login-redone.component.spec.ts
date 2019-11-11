import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LoginRedoneComponent } from './login-redone.component';

describe('LoginRedoneComponent', () => {
  let component: LoginRedoneComponent;
  let fixture: ComponentFixture<LoginRedoneComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LoginRedoneComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginRedoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
