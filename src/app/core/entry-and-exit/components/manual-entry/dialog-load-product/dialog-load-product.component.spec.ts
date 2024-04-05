import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogLoadProductComponent } from './dialog-load-product.component';

describe('DialogLoadProductComponent', () => {
  let component: DialogLoadProductComponent;
  let fixture: ComponentFixture<DialogLoadProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogLoadProductComponent]
    });
    fixture = TestBed.createComponent(DialogLoadProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
