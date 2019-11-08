import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NewestRecipeComponent } from './newest-recipe.component';

describe('NewestRecipeComponent', () => {
  let component: NewestRecipeComponent;
  let fixture: ComponentFixture<NewestRecipeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NewestRecipeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NewestRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
