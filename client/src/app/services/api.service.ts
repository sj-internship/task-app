import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import {TaskUpdate, TaskAdd} from '../models/task'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get('/api/tasks');
  }
  getTaskById(id:string):Observable<any>{
    return this.http.get('/api/task/' + id);
  }

  updateTask(params:TaskUpdate):Observable<any>{
    return this.http.post('/api/task/' + params._id, params);
  }
  addTask(params:TaskAdd):Observable<any>{
    return this.http.post('/api/task/', params);
  }
  deleteTask(id):Observable<any>{
    return this.http.delete('/api/task/' + id);
  }
}