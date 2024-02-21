import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentsMethodsComponent } from './payments-methods.component';

describe('PaymentsMethodsComponent', () => {
  let component: PaymentsMethodsComponent;
  let fixture: ComponentFixture<PaymentsMethodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PaymentsMethodsComponent]
    });
    fixture = TestBed.createComponent(PaymentsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
