import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSuppliersComponent } from './new-suppliers.component';

describe('NewSuppliersComponent', () => {
  let component: NewSuppliersComponent;
  let fixture: ComponentFixture<NewSuppliersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewSuppliersComponent]
    });
    fixture = TestBed.createComponent(NewSuppliersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
