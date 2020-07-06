import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {tap, map} from 'rxjs/operators'
@Injectable({
  providedIn: 'root'
})
export class TaskService {

  constructor(private http : HttpClient) { }

  getAllTasks():Observable<any>{
    return this.http.get('localhost:3000/api/tasks').pipe(
      map(res=>{
        console.log(res)
        return res
      })
    )
  }
}
