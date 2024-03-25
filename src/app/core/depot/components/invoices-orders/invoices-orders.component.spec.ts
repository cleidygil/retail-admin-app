import { ComponentFixture, TestBed } from '@angular/core/testing';

import { InvoicesOrdersComponent } from './invoices-orders.component';

describe('InvoicesOrdersComponent', () => {
  let component: InvoicesOrdersComponent;
  let fixture: ComponentFixture<InvoicesOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [InvoicesOrdersComponent]
    });
    fixture = TestBed.createComponent(InvoicesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
