import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsPurchasePriceComponent } from './payments-purchase-price.component';

describe('PaymentsPurchasePriceComponent', () => {
  let component: PaymentsPurchasePriceComponent;
  let fixture: ComponentFixture<PaymentsPurchasePriceComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsPurchasePriceComponent]
    });
    fixture = TestBed.createComponent(PaymentsPurchasePriceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
