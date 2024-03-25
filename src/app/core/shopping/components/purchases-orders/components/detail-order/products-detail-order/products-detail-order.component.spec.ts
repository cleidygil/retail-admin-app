import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailOrderComponent } from './products-detail-order.component';

describe('ProductsDetailOrderComponent', () => {
  let component: ProductsDetailOrderComponent;
  let fixture: ComponentFixture<ProductsDetailOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDetailOrderComponent]
    });
    fixture = TestBed.createComponent(ProductsDetailOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
