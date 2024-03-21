import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogNewProductComponent } from './dialog-new-product.component';

describe('DialogNewProductComponent', () => {
  let component: DialogNewProductComponent;
  let fixture: ComponentFixture<DialogNewProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogNewProductComponent]
    });
    fixture = TestBed.createComponent(DialogNewProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
