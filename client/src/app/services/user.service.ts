import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {TaskModel, TaskUpdateModel, TaskAddModel} from '../models/task';
import {ApiService} from './api.service';
import { UserCredentialsModel } from '../models/user';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private apiService:ApiService) { }

  public registerUser(params:UserCredentialsModel):Observable<any>{
    return this.apiService.register(params);
  }
}
