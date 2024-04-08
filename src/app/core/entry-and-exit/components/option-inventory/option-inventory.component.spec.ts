import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OptionInventoryComponent } from './option-inventory.component';

describe('OptionInventoryComponent', () => {
  let component: OptionInventoryComponent;
  let fixture: ComponentFixture<OptionInventoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [OptionInventoryComponent]
    });
    fixture = TestBed.createComponent(OptionInventoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
