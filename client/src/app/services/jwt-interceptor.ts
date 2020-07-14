import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { AuthenticationService } from './authentication.service';
import {environment as config } from '../../environments/environment';
import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable() 
export class JwtInterceptor implements HttpInterceptor {
    constructor(private as: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const currentUser = this.as.currentUserValue;
        console.log({req})
        if(currentUser && currentUser.token && req.url.startsWith(config.path)){
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + currentUser.token) });
        };

        return next.handle(req);
    }
}