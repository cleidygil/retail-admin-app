import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DistributeProductComponent } from './distribute-product.component';

describe('DistributeProductComponent', () => {
  let component: DistributeProductComponent;
  let fixture: ComponentFixture<DistributeProductComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DistributeProductComponent]
    });
    fixture = TestBed.createComponent(DistributeProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
