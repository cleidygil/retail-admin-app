import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryAndExitComponent } from './entry-and-exit.component';

describe('EntryAndExitComponent', () => {
  let component: EntryAndExitComponent;
  let fixture: ComponentFixture<EntryAndExitComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [EntryAndExitComponent]
    });
    fixture = TestBed.createComponent(EntryAndExitComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
