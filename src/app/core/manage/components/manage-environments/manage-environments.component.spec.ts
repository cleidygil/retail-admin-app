import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ManageEnvironmentsComponent } from './manage-environments.component';

describe('ManageEnvironmentsComponent', () => {
  let component: ManageEnvironmentsComponent;
  let fixture: ComponentFixture<ManageEnvironmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ManageEnvironmentsComponent]
    });
    fixture = TestBed.createComponent(ManageEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
