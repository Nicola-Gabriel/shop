import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { delay, finalize } from 'rxjs/operators';
import { InterceptorService } from './services/interceptor.service';

@Injectable()
export class LoadingInterceptor implements HttpInterceptor {
    constructor(private interceptService: InterceptorService ) {}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
       if (!req.url.includes('emailexists'))
       {
           this.interceptService.onBusy();
       }
       
        return next.handle(req).pipe(
            delay(500),
            finalize(() => {
                this.interceptService.onIdle();
            })
        );
    }

}
