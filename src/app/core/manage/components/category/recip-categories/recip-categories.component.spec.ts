import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipCategoriesComponent } from './recip-categories.component';

describe('RecipCategoriesComponent', () => {
  let component: RecipCategoriesComponent;
  let fixture: ComponentFixture<RecipCategoriesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipCategoriesComponent]
    });
    fixture = TestBed.createComponent(RecipCategoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
