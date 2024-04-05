import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDeleteRecipeComponent } from './dialog-delete-recipe.component';

describe('DialogDeleteRecipeComponent', () => {
  let component: DialogDeleteRecipeComponent;
  let fixture: ComponentFixture<DialogDeleteRecipeComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDeleteRecipeComponent]
    });
    fixture = TestBed.createComponent(DialogDeleteRecipeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
