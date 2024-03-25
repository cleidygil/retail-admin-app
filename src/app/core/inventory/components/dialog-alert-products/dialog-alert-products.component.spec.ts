import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAlertProductsComponent } from './dialog-alert-products.component';

describe('DialogAlertProductsComponent', () => {
  let component: DialogAlertProductsComponent;
  let fixture: ComponentFixture<DialogAlertProductsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAlertProductsComponent]
    });
    fixture = TestBed.createComponent(DialogAlertProductsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
