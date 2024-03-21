import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewSuppliersComponent } from './dialog-new-suppliers.component';

describe('DialogNewSuppliersComponent', () => {
  let component: DialogNewSuppliersComponent;
  let fixture: ComponentFixture<DialogNewSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewSuppliersComponent]
    });
    fixture = TestBed.createComponent(DialogNewSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
