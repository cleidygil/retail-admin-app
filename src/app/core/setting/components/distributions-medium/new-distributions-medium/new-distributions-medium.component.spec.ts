import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewDistributionsMediumComponent } from './new-distributions-medium.component';

describe('NewDistributionsMediumComponent', () => {
  let component: NewDistributionsMediumComponent;
  let fixture: ComponentFixture<NewDistributionsMediumComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewDistributionsMediumComponent]
    });
    fixture = TestBed.createComponent(NewDistributionsMediumComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
