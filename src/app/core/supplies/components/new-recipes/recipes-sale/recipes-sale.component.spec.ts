import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesSaleComponent } from './recipes-sale.component';

describe('RecipesSaleComponent', () => {
  let component: RecipesSaleComponent;
  let fixture: ComponentFixture<RecipesSaleComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesSaleComponent]
    });
    fixture = TestBed.createComponent(RecipesSaleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
