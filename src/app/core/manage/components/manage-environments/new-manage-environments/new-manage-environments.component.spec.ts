import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManageEnvironmentsComponent } from './new-manage-environments.component';

describe('NewManageEnvironmentsComponent', () => {
  let component: NewManageEnvironmentsComponent;
  let fixture: ComponentFixture<NewManageEnvironmentsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewManageEnvironmentsComponent]
    });
    fixture = TestBed.createComponent(NewManageEnvironmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
