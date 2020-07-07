import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http : HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get('/api/tasks')
  }
  getTaskById(id:number):Observable<any>{
    return this.http.get('/api/task/' + id)
  }

  updateTask(params):Observable<any>{
    return this.http.post('/api/task/' + params._id, params)
  }
  addTask(params):Observable<any>{
    return this.http.post('/api/task/', params)
  }
  //deleteTask(id):
  
}