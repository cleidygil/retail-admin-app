import { TestBed } from '@angular/core/testing';

import { EntryAndExitService } from './entry-and-exit.service';

describe('EntryAndExitService', () => {
  let service: EntryAndExitService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EntryAndExitService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
