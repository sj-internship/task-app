import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap, map, catchError} from 'rxjs/operators'
import {Task} from '../models/task'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  getAllTasks():Observable<Task[]>{
    console.log('getall')
    return this.http.get('/api/tasks').pipe(
      map((res:any)=>{
        return res.result.data.map(item=>{
          console.log(item)
          return <Task>item;
        })
      })
    )
  }
}
