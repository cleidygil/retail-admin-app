import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecipesAllComponent } from './recipes-all.component';

describe('RecipesAllComponent', () => {
  let component: RecipesAllComponent;
  let fixture: ComponentFixture<RecipesAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [RecipesAllComponent]
    });
    fixture = TestBed.createComponent(RecipesAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
