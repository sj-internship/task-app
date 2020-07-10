import { Component, OnInit, OnDestroy } from '@angular/core';
import {TaskService} from '../../../services/task.service';
import {TaskModel} from '../../../models/task';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit, OnDestroy {
  public tasks:TaskModel[];
  private ngUnsubscribe = new Subject<void>();
  constructor(private taskService: TaskService) { }

  public ngOnInit() {
    this.getAllTasks();
  }
  public getAllTasks(){
    this.taskService.getAllTasks().pipe(takeUntil(this.ngUnsubscribe)).subscribe(tasks=>{
      this.tasks = tasks;
    });    ``
  }
  public ngOnDestroy(){
    this.ngUnsubscribe.next();
    this.ngUnsubscribe.complete();
  }
}
