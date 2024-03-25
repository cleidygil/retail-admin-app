import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsDetailOrdersHistoryComponent } from './products-detail-orders-history.component';

describe('ProductsDetailOrdersHistoryComponent', () => {
  let component: ProductsDetailOrdersHistoryComponent;
  let fixture: ComponentFixture<ProductsDetailOrdersHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductsDetailOrdersHistoryComponent]
    });
    fixture = TestBed.createComponent(ProductsDetailOrdersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
