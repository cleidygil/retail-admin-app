import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StoresAllComponent } from './stores-all.component';

describe('StoresAllComponent', () => {
  let component: StoresAllComponent;
  let fixture: ComponentFixture<StoresAllComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [StoresAllComponent]
    });
    fixture = TestBed.createComponent(StoresAllComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
