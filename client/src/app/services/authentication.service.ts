import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {User} from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  constructor() { 
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  public login(username: string, password: string):boolean{
    const hardCodedUser:User = {
      id:1,
      userName:'admin',
      password:'admin123',
      token:'token'
    }
    if(username === hardCodedUser.userName && password === hardCodedUser.password){
        localStorage.setItem('currentUser', JSON.stringify(hardCodedUser));
        this.currentUserSubject.next(hardCodedUser);
        return true;
    };
    return false;
  }

  public logout() {
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
