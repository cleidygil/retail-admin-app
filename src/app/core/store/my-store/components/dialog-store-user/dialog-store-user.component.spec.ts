import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogStoreUserComponent } from './dialog-store-user.component';

describe('DialogStoreUserComponent', () => {
  let component: DialogStoreUserComponent;
  let fixture: ComponentFixture<DialogStoreUserComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogStoreUserComponent]
    });
    fixture = TestBed.createComponent(DialogStoreUserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
