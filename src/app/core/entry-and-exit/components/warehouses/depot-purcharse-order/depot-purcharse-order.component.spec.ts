import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotPurcharseOrderComponent } from './depot-purcharse-order.component';

describe('DepotPurcharseOrderComponent', () => {
  let component: DepotPurcharseOrderComponent;
  let fixture: ComponentFixture<DepotPurcharseOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepotPurcharseOrderComponent]
    });
    fixture = TestBed.createComponent(DepotPurcharseOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
