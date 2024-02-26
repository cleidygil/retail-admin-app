import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StorePaymentsMethodsComponent } from './store-payments-methods.component';

describe('StorePaymentsMethodsComponent', () => {
  let component: StorePaymentsMethodsComponent;
  let fixture: ComponentFixture<StorePaymentsMethodsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StorePaymentsMethodsComponent]
    });
    fixture = TestBed.createComponent(StorePaymentsMethodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
