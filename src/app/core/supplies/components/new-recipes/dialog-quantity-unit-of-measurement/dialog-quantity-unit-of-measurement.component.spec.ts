import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuantityUnitOfMeasurementComponent } from './dialog-quantity-unit-of-measurement.component';

describe('DialogQuantityUnitOfMeasurementComponent', () => {
  let component: DialogQuantityUnitOfMeasurementComponent;
  let fixture: ComponentFixture<DialogQuantityUnitOfMeasurementComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogQuantityUnitOfMeasurementComponent]
    });
    fixture = TestBed.createComponent(DialogQuantityUnitOfMeasurementComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
