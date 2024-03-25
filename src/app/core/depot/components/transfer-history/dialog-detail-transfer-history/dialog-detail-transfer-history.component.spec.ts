import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogDetailTransferHistoryComponent } from './dialog-detail-transfer-history.component';

describe('DialogDetailTransferHistoryComponent', () => {
  let component: DialogDetailTransferHistoryComponent;
  let fixture: ComponentFixture<DialogDetailTransferHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogDetailTransferHistoryComponent]
    });
    fixture = TestBed.createComponent(DialogDetailTransferHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
