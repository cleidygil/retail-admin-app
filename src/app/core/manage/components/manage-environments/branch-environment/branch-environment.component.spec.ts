import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BranchEnvironmentComponent } from './branch-environment.component';

describe('BranchEnvironmentComponent', () => {
  let component: BranchEnvironmentComponent;
  let fixture: ComponentFixture<BranchEnvironmentComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [BranchEnvironmentComponent]
    });
    fixture = TestBed.createComponent(BranchEnvironmentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
