import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsAddBankAccountComponent } from './methods-add-bank-account.component';

describe('MethodsAddBankAccountComponent', () => {
  let component: MethodsAddBankAccountComponent;
  let fixture: ComponentFixture<MethodsAddBankAccountComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodsAddBankAccountComponent]
    });
    fixture = TestBed.createComponent(MethodsAddBankAccountComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
