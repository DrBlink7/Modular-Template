import { TestBed } from '@angular/core/testing';

import { AuthInterceptor } from './auth.interceptor';

xdescribe('AuthInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      AuthInterceptor
    ]
  }));

  it('should be created', () => {
    const interceptor: AuthInterceptor = TestBed.inject(AuthInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
