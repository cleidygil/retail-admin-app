import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransferOfItemsComponent } from './transfer-of-items.component';

describe('TransferOfItemsComponent', () => {
  let component: TransferOfItemsComponent;
  let fixture: ComponentFixture<TransferOfItemsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [TransferOfItemsComponent]
    });
    fixture = TestBed.createComponent(TransferOfItemsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
