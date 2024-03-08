import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsPaymentsComponent } from './methods-payments.component';

describe('MethodsPaymentsComponent', () => {
  let component: MethodsPaymentsComponent;
  let fixture: ComponentFixture<MethodsPaymentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodsPaymentsComponent]
    });
    fixture = TestBed.createComponent(MethodsPaymentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
