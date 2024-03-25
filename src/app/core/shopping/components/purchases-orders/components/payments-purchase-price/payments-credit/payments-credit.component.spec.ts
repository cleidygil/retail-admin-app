import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsCreditComponent } from './payments-credit.component';

describe('PaymentsCreditComponent', () => {
  let component: PaymentsCreditComponent;
  let fixture: ComponentFixture<PaymentsCreditComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsCreditComponent]
    });
    fixture = TestBed.createComponent(PaymentsCreditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
