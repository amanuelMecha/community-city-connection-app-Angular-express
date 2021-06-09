import { TestBed } from '@angular/core/testing';

import { EnterceptorforTokenheaderInterceptor } from './enterceptorfor-tokenheader.interceptor';

describe('EnterceptorforTokenheaderInterceptor', () => {
  beforeEach(() => TestBed.configureTestingModule({
    providers: [
      EnterceptorforTokenheaderInterceptor
      ]
  }));

  it('should be created', () => {
    const interceptor: EnterceptorforTokenheaderInterceptor = TestBed.inject(EnterceptorforTokenheaderInterceptor);
    expect(interceptor).toBeTruthy();
  });
});
