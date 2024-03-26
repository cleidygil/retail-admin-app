import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductionQueueComponent } from './production-queue.component';

describe('ProductionQueueComponent', () => {
  let component: ProductionQueueComponent;
  let fixture: ComponentFixture<ProductionQueueComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ProductionQueueComponent]
    });
    fixture = TestBed.createComponent(ProductionQueueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
