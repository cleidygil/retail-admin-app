import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBranchsComponent } from './my-branchs.component';

describe('MyBranchsComponent', () => {
  let component: MyBranchsComponent;
  let fixture: ComponentFixture<MyBranchsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MyBranchsComponent]
    });
    fixture = TestBed.createComponent(MyBranchsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
