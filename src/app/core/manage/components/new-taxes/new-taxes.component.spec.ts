import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewTaxesComponent } from './new-taxes.component';

describe('NewTaxesComponent', () => {
  let component: NewTaxesComponent;
  let fixture: ComponentFixture<NewTaxesComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [NewTaxesComponent]
    });
    fixture = TestBed.createComponent(NewTaxesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
