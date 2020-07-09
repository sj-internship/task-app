import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { TaskUpdate, TaskAdd } from '../models/task'
import { UserCredentials } from '../models/user'
@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private http: HttpClient) { }

  public register(params: UserCredentials): Observable<any> {
    return this.http.post('/api/register', params);
  }

  public login(params: UserCredentials): Observable<any> {
    return this.http.post('/api/signIn', params);
  }
  public getAllTasks(): Observable<any> {
    return this.http.get('/api/tasks');
  }
  public getTaskById(id: string): Observable<any> {
    return this.http.get('/api/task/' + id);
  }

  public updateTask(params: TaskUpdate): Observable<any> {
    return this.http.post('/api/task/' + params._id, params);
  }
  public addTask(params: TaskAdd): Observable<any> {
    return this.http.post('/api/task/', params);
  }
  public deleteTask(id): Observable<any> {
    return this.http.delete('/api/task/' + id);
  }
}