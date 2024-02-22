import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogBrandsComponent } from './dialog-brands.component';

describe('DialogBrandsComponent', () => {
  let component: DialogBrandsComponent;
  let fixture: ComponentFixture<DialogBrandsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DialogBrandsComponent]
    });
    fixture = TestBed.createComponent(DialogBrandsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
