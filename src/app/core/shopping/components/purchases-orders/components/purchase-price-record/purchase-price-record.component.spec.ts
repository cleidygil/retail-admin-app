import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PurchasePriceRecordComponent } from './purchase-price-record.component';

describe('PurchasePriceRecordComponent', () => {
  let component: PurchasePriceRecordComponent;
  let fixture: ComponentFixture<PurchasePriceRecordComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PurchasePriceRecordComponent]
    });
    fixture = TestBed.createComponent(PurchasePriceRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
