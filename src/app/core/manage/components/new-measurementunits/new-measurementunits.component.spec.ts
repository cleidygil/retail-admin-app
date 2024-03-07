import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewMeasurementunitsComponent } from './new-measurementunits.component';

describe('NewMeasurementunitsComponent', () => {
  let component: NewMeasurementunitsComponent;
  let fixture: ComponentFixture<NewMeasurementunitsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewMeasurementunitsComponent]
    });
    fixture = TestBed.createComponent(NewMeasurementunitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
