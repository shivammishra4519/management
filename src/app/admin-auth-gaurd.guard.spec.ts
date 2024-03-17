import { TestBed } from '@angular/core/testing';
import { CanActivateFn } from '@angular/router';

import { adminAuthGaurdGuard } from './admin-auth-gaurd.guard';

describe('adminAuthGaurdGuard', () => {
  const executeGuard: CanActivateFn = (...guardParameters) => 
      TestBed.runInInjectionContext(() => adminAuthGaurdGuard(...guardParameters));

  beforeEach(() => {
    TestBed.configureTestingModule({});
  });

  it('should be created', () => {
    expect(executeGuard).toBeTruthy();
  });
});
