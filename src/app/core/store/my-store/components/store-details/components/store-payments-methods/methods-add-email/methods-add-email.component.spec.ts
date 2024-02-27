import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsAddEmailComponent } from './methods-add-email.component';

describe('MethodsAddEmailComponent', () => {
  let component: MethodsAddEmailComponent;
  let fixture: ComponentFixture<MethodsAddEmailComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodsAddEmailComponent]
    });
    fixture = TestBed.createComponent(MethodsAddEmailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
