import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodUsdComponent } from './method-usd.component';

describe('MethodUsdComponent', () => {
  let component: MethodUsdComponent;
  let fixture: ComponentFixture<MethodUsdComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodUsdComponent]
    });
    fixture = TestBed.createComponent(MethodUsdComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
