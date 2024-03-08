import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodsStoreComponent } from './methods-store.component';

describe('MethodsStoreComponent', () => {
  let component: MethodsStoreComponent;
  let fixture: ComponentFixture<MethodsStoreComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodsStoreComponent]
    });
    fixture = TestBed.createComponent(MethodsStoreComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
