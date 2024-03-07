import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewRecipesComponent } from './new-recipes.component';

describe('NewRecipesComponent', () => {
  let component: NewRecipesComponent;
  let fixture: ComponentFixture<NewRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewRecipesComponent]
    });
    fixture = TestBed.createComponent(NewRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
