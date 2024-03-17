import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { userAuthGaurdGuard } from './user-auth-gaurd.guard';

describe('userAuthGaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => userAuthGaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
