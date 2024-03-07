import { TestBed } from '@angular/core/testing';

import { ManegeService } from './manege.service';

describe('ManegeService', () => {
  let service: ManegeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ManegeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
