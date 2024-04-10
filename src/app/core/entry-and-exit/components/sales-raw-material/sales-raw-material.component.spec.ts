import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SalesRawMaterialComponent } from './sales-raw-material.component';

describe('SalesRawMaterialComponent', () => {
  let component: SalesRawMaterialComponent;
  let fixture: ComponentFixture<SalesRawMaterialComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [SalesRawMaterialComponent]
    });
    fixture = TestBed.createComponent(SalesRawMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
