import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewProductionOrderComponent } from './new-production-order.component';

describe('NewProductionOrderComponent', () => {
  let component: NewProductionOrderComponent;
  let fixture: ComponentFixture<NewProductionOrderComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewProductionOrderComponent]
    });
    fixture = TestBed.createComponent(NewProductionOrderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
