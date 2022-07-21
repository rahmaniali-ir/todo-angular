import { TestBed } from '@angular/core/testing';

import { UnAuthGuard } from './unauth.guard';

describe('UnauthGuard', () => {
  let guard: UnAuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(UnAuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
