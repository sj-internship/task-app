import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {Task, TaskUpdate, TaskAdd} from '../models/task';
import {ApiService} from './api.service';
import { UserCredentials } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }

  public registerUser(params:UserCredentials):Observable<any>{
    return this.apiService.register(params).pipe();
  }
}
