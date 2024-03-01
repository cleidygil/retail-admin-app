import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodBsComponent } from './method-bs.component';

describe('MethodBsComponent', () => {
  let component: MethodBsComponent;
  let fixture: ComponentFixture<MethodBsComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [MethodBsComponent]
    });
    fixture = TestBed.createComponent(MethodBsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
