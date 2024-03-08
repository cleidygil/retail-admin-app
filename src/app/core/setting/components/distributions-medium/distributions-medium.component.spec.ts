import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributionsMediumComponent } from './distributions-medium.component';

describe('DistributionsMediumComponent', () => {
  let component: DistributionsMediumComponent;
  let fixture: ComponentFixture<DistributionsMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributionsMediumComponent]
    });
    fixture = TestBed.createComponent(DistributionsMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
