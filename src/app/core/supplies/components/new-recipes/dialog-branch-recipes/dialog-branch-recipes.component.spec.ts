import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBranchRecipesComponent } from './dialog-branch-recipes.component';

describe('DialogBranchRecipesComponent', () => {
  let component: DialogBranchRecipesComponent;
  let fixture: ComponentFixture<DialogBranchRecipesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBranchRecipesComponent]
    });
    fixture = TestBed.createComponent(DialogBranchRecipesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
