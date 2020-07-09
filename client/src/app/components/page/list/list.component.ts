import { Component, OnInit } from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {Task} from '../../../models/task';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {
  public tasks:Task[];
  private ngUnsubscribe = new Subject<void>();
  constructor(private taskService: TaskService) { }

  public ngOnInit() {
    this.getAllTasks();
  }
  public getAllTasks(){
    this.taskService.getAllTasks().pipe(takeUntil(this.ngUnsubscribe)).subscribe(tasks=>{
      this.tasks = tasks;
    });    
  }
  public onDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
