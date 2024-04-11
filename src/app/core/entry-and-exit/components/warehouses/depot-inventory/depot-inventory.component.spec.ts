import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DepotInventoryComponent } from './depot-inventory.component';

describe('DepotInventoryComponent', () => {
  let component: DepotInventoryComponent;
  let fixture: ComponentFixture<DepotInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DepotInventoryComponent]
    });
    fixture = TestBed.createComponent(DepotInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
