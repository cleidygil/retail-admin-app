import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductEgressComponent } from './dialog-product-egress.component';

describe('DialogProductEgressComponent', () => {
  let component: DialogProductEgressComponent;
  let fixture: ComponentFixture<DialogProductEgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogProductEgressComponent]
    });
    fixture = TestBed.createComponent(DialogProductEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
