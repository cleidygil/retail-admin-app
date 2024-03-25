import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuantityTablesComponent } from './quantity-tables.component';

describe('QuantityTablesComponent', () => {
  let component: QuantityTablesComponent;
  let fixture: ComponentFixture<QuantityTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [QuantityTablesComponent]
    });
    fixture = TestBed.createComponent(QuantityTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
