import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {Task} from '../models/task';
import {ApiService} from './api.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }

  getAllTasks():Observable<Task[]>{
    return this.apiService.getAllTasks().pipe(
      map((res:any)=>{
        return res.result.data.map(item=>{
          return <Task>item;
          
        })
      })
    );
  }
  getTaskById(id):Observable<Task>{
    return this.apiService.getTaskById(id).pipe(
      map((res:any)=>{
        return <Task>res.result.data;
      })
    );
  }
  updateTask(params):Observable<Task>{
    return this.apiService.updateTask(params).pipe(
      map((res:any)=>{
        return <Task>res.result.data;
      })
    );
  }
  addTask(params):Observable<Task>{
    return this.apiService.addTask(params).pipe(
      map((res:any)=>{
        return <Task>res.result.data;
      })
    );
  }
  deleteTask(id):Observable<any>{
    return this.apiService.deleteTask(id);
  }
}