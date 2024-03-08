import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMethodPaymentComponent } from './new-method-payment.component';

describe('NewMethodPaymentComponent', () => {
  let component: NewMethodPaymentComponent;
  let fixture: ComponentFixture<NewMethodPaymentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMethodPaymentComponent]
    });
    fixture = TestBed.createComponent(NewMethodPaymentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
