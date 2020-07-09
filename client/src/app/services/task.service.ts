import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators';
import {Task, TaskUpdate, TaskAdd} from '../models/task';
import {ApiService} from './api.service';
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }

  public getAllTasks():Observable<Task[]>{
    return this.apiService.getAllTasks().pipe(
      map((res:any)=>{
        return res.result.data.map(item=> item)
      })
    );
  }
  public getTaskById(id:string):Observable<Task>{
    return this.apiService.getTaskById(id).pipe(
      map((res:any)=>{
        return <Task>res.result.data;
      })
    );
  }
  public updateTask(params:TaskUpdate):Observable<Task>{
    return this.apiService.updateTask(params).pipe(
      map((res:any)=>res.result.data)
    );
  }
  public addTask(params:TaskAdd):Observable<Task>{
    return this.apiService.addTask(params).pipe(
      map((res:any)=>res.result.data)
    );
  }
  public deleteTask(id:string):Observable<any>{
    return this.apiService.deleteTask(id);
  }
  public getTags():Observable<[String]>{
    return this.apiService.getAllTags().pipe(
      map(res=>{
        console.log(res)
        return res;
      })
    )
  }
}