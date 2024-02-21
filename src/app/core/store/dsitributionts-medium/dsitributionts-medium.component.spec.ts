import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DsitributiontsMediumComponent } from './dsitributionts-medium.component';

describe('DsitributiontsMediumComponent', () => {
  let component: DsitributiontsMediumComponent;
  let fixture: ComponentFixture<DsitributiontsMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DsitributiontsMediumComponent]
    });
    fixture = TestBed.createComponent(DsitributiontsMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
