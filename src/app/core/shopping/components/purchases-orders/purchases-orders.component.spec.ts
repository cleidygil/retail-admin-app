import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasesOrdersComponent } from './purchases-orders.component';

describe('PurchasesOrdersComponent', () => {
  let component: PurchasesOrdersComponent;
  let fixture: ComponentFixture<PurchasesOrdersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasesOrdersComponent]
    });
    fixture = TestBed.createComponent(PurchasesOrdersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
