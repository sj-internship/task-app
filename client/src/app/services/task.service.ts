import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { TaskModel, TaskUpdateModel, TaskAddModel } from '../models/task';
import { ApiService } from './api.service';
@Injectable({
    providedIn: 'root'
})
export class TaskService {

    constructor(private apiService: ApiService) { }

    public getAllTasks(): Observable<TaskModel[]> {
        return this.apiService.getAllTasks().pipe(
            map((res: any) => {
                return res.result.data.map(item => item)
            })
        );
    }
    public getTaskById(id: string): Observable<TaskModel> {
        return this.apiService.getTaskById(id).pipe(
            map((res: any) => {
                return <TaskModel>res.result.data;
            })
        );
    }
    public updateTask(params: TaskUpdateModel): Observable<TaskModel> {
        return this.apiService.updateTask(params).pipe(
            map((res: any) => res.result.data)
        );
    }
    public addTask(params: TaskAddModel): Observable<TaskModel> {
        return this.apiService.addTask(params).pipe(
            map((res: any) => res.result.data)
        );
    }
    public deleteTask(id: string): Observable<any> {
        return this.apiService.deleteTask(id);
    }
    public getTags(): Observable<[String]> {
        return this.apiService.getAllTags();
    }
}