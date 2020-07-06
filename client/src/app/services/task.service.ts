import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators'
import {Task} from '../models/task'
import {ApiService} from './api.service'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private apiService:ApiService) { }

  getAllTasks():Observable<Task[]>{
    return this.apiService.getAllTasks().pipe(
      map((res:any)=>{
        return res.result.data.map(item=>{
          console.log(item)
          return <Task>item;
        })
      })
    )
  }
}