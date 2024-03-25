import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllPriceProductsComponent } from './all-price-products.component';

describe('AllPriceProductsComponent', () => {
  let component: AllPriceProductsComponent;
  let fixture: ComponentFixture<AllPriceProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllPriceProductsComponent]
    });
    fixture = TestBed.createComponent(AllPriceProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
