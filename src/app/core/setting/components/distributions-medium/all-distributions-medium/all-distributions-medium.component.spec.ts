import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AllDistributionsMediumComponent } from './all-distributions-medium.component';

describe('AllDistributionsMediumComponent', () => {
  let component: AllDistributionsMediumComponent;
  let fixture: ComponentFixture<AllDistributionsMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [AllDistributionsMediumComponent]
    });
    fixture = TestBed.createComponent(AllDistributionsMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
