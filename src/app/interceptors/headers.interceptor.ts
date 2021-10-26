import { Injectable } from '@angular/core';
import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HeadersInterceptor implements HttpInterceptor {
  constructor(
  ) {}

  intercept(
    req: HttpRequest<unknown>,
    next: HttpHandler
  ): Observable<HttpEvent<unknown>> {
    let headers = req.headers
      .set('If-Modified-Since', 'Mon, 26 Jul 1997 05:00:00 GMT')
      .set('Cache-Control', 'no-cache')
      .set('Pragma', 'no-cache');

    let httpRequest = req.clone({
      headers
    });
    return next.handle(httpRequest);
  }
}
