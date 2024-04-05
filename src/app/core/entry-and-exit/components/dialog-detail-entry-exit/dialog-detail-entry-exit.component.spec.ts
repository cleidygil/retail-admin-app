import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailEntryExitComponent } from './dialog-detail-entry-exit.component';

describe('DialogDetailEntryExitComponent', () => {
  let component: DialogDetailEntryExitComponent;
  let fixture: ComponentFixture<DialogDetailEntryExitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailEntryExitComponent]
    });
    fixture = TestBed.createComponent(DialogDetailEntryExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
