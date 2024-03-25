import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetailOrdersHistoryComponent } from './detail-orders-history.component';

describe('DetailOrdersHistoryComponent', () => {
  let component: DetailOrdersHistoryComponent;
  let fixture: ComponentFixture<DetailOrdersHistoryComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetailOrdersHistoryComponent]
    });
    fixture = TestBed.createComponent(DetailOrdersHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
