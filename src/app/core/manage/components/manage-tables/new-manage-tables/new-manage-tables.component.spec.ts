import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewManageTablesComponent } from './new-manage-tables.component';

describe('NewManageTablesComponent', () => {
  let component: NewManageTablesComponent;
  let fixture: ComponentFixture<NewManageTablesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewManageTablesComponent]
    });
    fixture = TestBed.createComponent(NewManageTablesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
