import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WarehouseReturnComponent } from './warehouse-return.component';

describe('WarehouseReturnComponent', () => {
  let component: WarehouseReturnComponent;
  let fixture: ComponentFixture<WarehouseReturnComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WarehouseReturnComponent]
    });
    fixture = TestBed.createComponent(WarehouseReturnComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
