import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailRecipesComponent } from './dialog-detail-recipes.component';

describe('DialogDetailRecipesComponent', () => {
  let component: DialogDetailRecipesComponent;
  let fixture: ComponentFixture<DialogDetailRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailRecipesComponent]
    });
    fixture = TestBed.createComponent(DialogDetailRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
