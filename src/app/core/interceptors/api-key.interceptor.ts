import { HttpHandler, HttpInterceptor, HttpRequest } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { environment } from '../../../environments/environment';

@Injectable()
export class ApiKeyInterceptor implements HttpInterceptor {
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    const cloned = req.clone({
    headers: req.headers.set('x-api-key', `${environment.apiKey}`)
    });
    return next.handle(cloned);
  }
}