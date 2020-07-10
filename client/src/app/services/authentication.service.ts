import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { ApiService } from './api.service'
import { tap, map, catchError } from 'rxjs/operators';
import { UserModel } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<UserModel>;
  public currentUser: Observable<UserModel>;

  constructor(private apiService: ApiService) {
    this.currentUserSubject = new BehaviorSubject<UserModel>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): UserModel {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string): Observable<any> {
    const user: UserModel = {
      userName: username,
      password: password,
      token: ''
    }
    return this.apiService.login({ name: username, password: password }).pipe(
      map((res: any) => {
        user.token = res.result.data.token;
        localStorage.setItem('currentUser', JSON.stringify(user));
        this.currentUserSubject.next(user);
        return res
      }),
    )

  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
