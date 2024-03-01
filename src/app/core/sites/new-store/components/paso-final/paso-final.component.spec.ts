import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasoFinalComponent } from './paso-final.component';

describe('PasoFinalComponent', () => {
  let component: PasoFinalComponent;
  let fixture: ComponentFixture<PasoFinalComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasoFinalComponent]
    });
    fixture = TestBed.createComponent(PasoFinalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
