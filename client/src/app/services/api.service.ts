import { Injectable } from '@angular/core';
import {TaskService} from './task.service'
import { Task } from '../models/task';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private ts:TaskService, private http : HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get('/api/tasks')
  }
}