import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewStoreComponent } from './new-store.component';

describe('NewStoreComponent', () => {
  let component: NewStoreComponent;
  let fixture: ComponentFixture<NewStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewStoreComponent]
    });
    fixture = TestBed.createComponent(NewStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
