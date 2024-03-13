import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogSelectedProductsComponent } from './dialog-selected-products.component';

describe('DialogSelectedProductsComponent', () => {
  let component: DialogSelectedProductsComponent;
  let fixture: ComponentFixture<DialogSelectedProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogSelectedProductsComponent]
    });
    fixture = TestBed.createComponent(DialogSelectedProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
