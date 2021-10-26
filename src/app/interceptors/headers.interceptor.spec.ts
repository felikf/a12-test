import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HTTP_INTERCEPTORS, HttpClient } from '@angular/common/http';

import { HeadersInterceptor } from './headers.interceptor';

describe('HeadersInterceptor', () => {
  let httpMock: HttpTestingController;
  let http: HttpClient;

  beforeEach(() =>
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        {
          provide: HTTP_INTERCEPTORS,
          useClass: HeadersInterceptor,
          multi: true
        }
      ]
    })
  );

  beforeEach(() => (httpMock = TestBed.inject(HttpTestingController)));
  beforeEach(() => (http = TestBed.inject(HttpClient)));

  it('should be created', () => {
    const service: HeadersInterceptor = TestBed.inject(HeadersInterceptor);
    expect(service).toBeTruthy();
  });

  it('should add default headers', () => {
    // given
    const testResult = http
      .get('/test/HeadersInterceptor')
      .toPromise()
      .then(response => expect(response).toBeTruthy());

    // when there is a request
    const req = httpMock.expectOne('/test/HeadersInterceptor');

    expect(req).toContainHeaders({
      'If-Modified-Since': 'Mon, 26 Jul 1997 05:00:00 GMT',
      'Cache-Control': 'no-cache',
      Pragma: 'no-cache'
    });

    req.flush({});

    return testResult;
  });
});
