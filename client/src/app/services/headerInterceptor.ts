import {
    HttpEvent,
    HttpInterceptor,
    HttpHandler,
    HttpRequest,
} from '@angular/common/http';
import { User } from '../models/user';
import { AuthenticationService } from './authentication.service'

import { Observable } from 'rxjs';
import { Injectable } from '@angular/core';
@Injectable() 
export class AddHeaderInterceptor implements HttpInterceptor {
    public currentUser: User;
    constructor(private as: AuthenticationService) { }
    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {

        let token = '';
        if(this.as.currentUserValue !== null){
            token = this.as.currentUserValue.token;
        };
        // Clone the request to add the new header
        const clonedRequest = req.clone({ headers: req.headers.set('Authorization', 'Bearer ' + token) });

        return next.handle(clonedRequest);
    }
}