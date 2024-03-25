import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogChangeInvoicesOrdersComponent } from './dialog-change-invoices-orders.component';

describe('DialogChangeInvoicesOrdersComponent', () => {
  let component: DialogChangeInvoicesOrdersComponent;
  let fixture: ComponentFixture<DialogChangeInvoicesOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogChangeInvoicesOrdersComponent]
    });
    fixture = TestBed.createComponent(DialogChangeInvoicesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
