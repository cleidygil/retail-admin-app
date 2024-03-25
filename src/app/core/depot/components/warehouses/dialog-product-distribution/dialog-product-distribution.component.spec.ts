import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogProductDistributionComponent } from './dialog-product-distribution.component';

describe('DialogProductDistributionComponent', () => {
  let component: DialogProductDistributionComponent;
  let fixture: ComponentFixture<DialogProductDistributionComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogProductDistributionComponent]
    });
    fixture = TestBed.createComponent(DialogProductDistributionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
