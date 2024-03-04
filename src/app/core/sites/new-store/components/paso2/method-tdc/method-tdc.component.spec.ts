import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodTdcComponent } from './method-tdc.component';

describe('MethodTdcComponent', () => {
  let component: MethodTdcComponent;
  let fixture: ComponentFixture<MethodTdcComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodTdcComponent]
    });
    fixture = TestBed.createComponent(MethodTdcComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
