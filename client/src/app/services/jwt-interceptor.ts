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

        let token = '';
        if(this.as.currentUserValue && this.as.currentUserValue.token){
            token = this.as.currentUserValue.token;
        };
        if(req.url.startsWith(config.apiUrl)){
            req = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });
        }

        return next.handle(req);
    }
}