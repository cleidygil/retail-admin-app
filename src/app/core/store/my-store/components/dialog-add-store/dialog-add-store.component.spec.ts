import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogAddStoreComponent } from './dialog-add-store.component';

describe('DialogAddStoreComponent', () => {
  let component: DialogAddStoreComponent;
  let fixture: ComponentFixture<DialogAddStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogAddStoreComponent]
    });
    fixture = TestBed.createComponent(DialogAddStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
