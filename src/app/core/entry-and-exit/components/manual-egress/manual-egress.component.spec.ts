import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManualEgressComponent } from './manual-egress.component';

describe('ManualEgressComponent', () => {
  let component: ManualEgressComponent;
  let fixture: ComponentFixture<ManualEgressComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManualEgressComponent]
    });
    fixture = TestBed.createComponent(ManualEgressComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
